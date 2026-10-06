import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.ts';

dotenv.config();

const app = express();
const PORT = 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

// Ensure upload directory exists
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads', 'proofs');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Basic JSON and URL encoded body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Simple in-memory rate limiting map for registration and status checking
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function rateLimiter(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (entry.count >= maxRequests) {
      res.status(429).json({
        error: 'Too many requests. Please wait a few minutes before trying again.',
      });
      return;
    }

    entry.count += 1;
    next();
  };
}

// Multer storage for secure payment screenshots
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `proof_${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`;
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext) || !allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file format. Only JPG, PNG, and WEBP image formats are permitted.'));
    }
    cb(null, true);
  },
});

// Admin authentication tokens in memory
const adminTokens = new Set<string>();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'aplus_admin_2026';

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : (req.headers['x-admin-token'] as string);

  if (!token || !adminTokens.has(token)) {
    res.status(401).json({ error: 'Unauthorized. Admin login required.' });
    return;
  }
  next();
}

// ================= API ROUTES =================

// Public Config (payment instructions & fees)
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    membershipFeeETB: process.env.MEMBERSHIP_FEE_ETB || '400',
    currency: 'ETB',
    oneTimeOnly: true,
    paymentMethods: [
      {
        id: 'telebirr',
        name: 'Telebirr',
        accountName: process.env.TELEBIRR_ACCOUNT_NAME || 'Aplus Academy / Yitbarek',
        accountNumber: process.env.TELEBIRR_PHONE_NUMBER || '09XXXXXXXX (Set in .env)',
        badge: 'Recommended for Mobile',
        steps: [
          'Open your Telebirr app or dial *127#',
          'Send the one-time fee to the Telebirr phone number',
          'Save or take a screenshot of the completed transaction confirmation SMS / receipt',
          'Note down the Transaction ID / Reference',
        ],
      },
      {
        id: 'cbe',
        name: 'Commercial Bank of Ethiopia (CBE)',
        accountName: process.env.CBE_ACCOUNT_NAME || 'Yitbarek Kifleyohans',
        accountNumber: process.env.CBE_ACCOUNT_NUMBER || '1000XXXXXXXXX (Set in .env)',
        badge: 'CBEBirr & Mobile Banking',
        steps: [
          'Transfer via CBE Mobile Banking, CBEBirr, or Bank Branch',
          'Send to the Commercial Bank of Ethiopia account number above',
          'Save or capture a screenshot of the transaction receipt showing the transfer details',
        ],
      },
      {
        id: 'boa',
        name: 'Bank of Abyssinia (BOA)',
        accountName: process.env.BOA_ACCOUNT_NAME || 'Yitbarek Kifleyohans',
        accountNumber: process.env.BOA_ACCOUNT_NUMBER || 'XXXXXXXXX (Set in .env)',
        badge: 'Mobile Banking',
        steps: [
          'Transfer via BOA Mobile Banking app to the account above',
          'Take a screenshot of the completed transfer confirmation',
        ],
      },
    ],
    supportContacts: {
      telegram: '@Yitbarek_2',
      telegramChannel: 'https://t.me/aplusacademy11',
      youtube: 'https://www.youtube.com/@aplusacademy1',
      email: 'ykifleyohans@gmail.com',
    },
  });
});

// Student Registration with Payment Proof Upload
app.post(
  '/api/register',
  rateLimiter(10, 15 * 60 * 1000), // max 10 submissions per 15 min per IP
  (req: Request, res: Response, next: NextFunction) => {
    upload.single('proof')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'Screenshot file is too large. Maximum size is 5MB.' });
        }
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  (req: Request, res: Response) => {
    try {
      const {
        full_name,
        phone,
        telegram_username,
        university,
        department_year,
        selected_course,
        payment_method,
        transaction_reference,
        message,
      } = req.body;

      // Validate required fields
      if (!full_name || full_name.trim().length < 3) {
        return res.status(400).json({ error: 'Please provide a valid full name (at least 3 characters).' });
      }

      const cleanPhone = (phone || '').trim();
      if (!cleanPhone || cleanPhone.length < 8) {
        return res.status(400).json({ error: 'Please enter a valid phone number.' });
      }

      const cleanTg = (telegram_username || '').trim();
      if (!cleanTg || cleanTg.length < 2) {
        return res.status(400).json({
          error: 'Please enter your Telegram username (so we can grant you group access).',
        });
      }

      if (!payment_method) {
        return res.status(400).json({ error: 'Please select which payment method you used.' });
      }

      const cleanRef = (transaction_reference || '').trim();
      if (!cleanRef || cleanRef.length < 3) {
        return res.status(400).json({
          error: 'Please enter the transaction reference or transaction ID from your receipt.',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: 'Payment proof screenshot is required. Please attach a screenshot of your payment.',
        });
      }

      // Create new pending registration record
      const record = db.create({
        full_name: full_name.trim(),
        phone: cleanPhone,
        telegram_username: cleanTg.startsWith('@') ? cleanTg : `@${cleanTg}`,
        university: university ? university.trim() : undefined,
        department_year: department_year ? department_year.trim() : undefined,
        selected_course: selected_course ? selected_course.trim() : 'All Courses (Complete Academy Access)',
        payment_method: payment_method.trim(),
        transaction_reference: cleanRef,
        payment_proof_filename: req.file.filename,
        payment_proof_original_name: req.file.originalname,
        payment_proof_mime: req.file.mimetype,
        payment_proof_size: req.file.size,
        message: message ? message.trim() : undefined,
      });

      // Respond with confirmation. DO NOT expose the Telegram link yet!
      return res.status(201).json({
        success: true,
        registrationId: record.id,
        phone: record.phone,
        status: record.status,
        message:
          'Registration submitted successfully! Your payment proof has been received and will be reviewed manually. Once approved, you can check your status here or receive access to the private Aplus Academy Telegram group.',
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      return res.status(500).json({
        error: 'An unexpected error occurred while processing your registration. Please try again.',
      });
    }
  }
);

// Check Registration Status (by Phone, Ref, or ID)
app.get('/api/status/:query', rateLimiter(30, 5 * 60 * 1000), (req: Request, res: Response) => {
  const query = req.params.query;
  if (!query || query.trim().length < 3) {
    return res.status(400).json({ error: 'Please provide a valid phone number or registration ID.' });
  }

  const record = db.findByPhoneOrQuery(query);
  if (!record) {
    return res.status(404).json({
      error: 'No registration found matching this phone number or reference. Please verify your input or submit a new registration.',
    });
  }

  // Safe response based on verification status
  if (record.status === 'approved') {
    // Only return the secret Telegram link when verified!
    const inviteLink =
      process.env.TELEGRAM_PRIVATE_INVITE_LINK || 'https://t.me/+AplusPrivateLearningGroupPlaceholder';

    return res.json({
      status: 'approved',
      id: record.id,
      full_name: record.full_name,
      telegram_username: record.telegram_username,
      created_at: record.created_at,
      reviewed_at: record.reviewed_at,
      telegramInviteLink: inviteLink,
      message: 'Congratulations! Your payment has been verified. Welcome to the Aplus Academy private learning group.',
    });
  }

  if (record.status === 'rejected') {
    return res.json({
      status: 'rejected',
      id: record.id,
      full_name: record.full_name,
      created_at: record.created_at,
      reviewed_at: record.reviewed_at,
      rejection_reason:
        record.rejection_reason || 'Payment could not be verified with the provided reference and screenshot.',
      message: 'Verification failed. Please review the note or contact Aplus Academy support to assist you.',
    });
  }

  // Pending
  return res.json({
    status: 'pending',
    id: record.id,
    full_name: record.full_name,
    created_at: record.created_at,
    message: 'Your registration is currently under review. The owner reviews submissions promptly.',
  });
});

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password === ADMIN_PASSWORD) {
    const token = crypto.randomBytes(32).toString('hex');
    adminTokens.add(token);
    return res.json({
      success: true,
      token,
      message: 'Logged in successfully as administrator.',
    });
  }

  // Small delay to prevent brute-force timing
  setTimeout(() => {
    res.status(401).json({ error: 'Invalid admin password.' });
  }, 400);
});

// Admin Logout
app.post('/api/admin/logout', requireAdmin, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : (req.headers['x-admin-token'] as string);

  if (token) adminTokens.delete(token);
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Admin: Get Submissions
app.get('/api/admin/submissions', requireAdmin, (_req: Request, res: Response) => {
  const list = db.getAll();
  const stats = db.getStats();
  res.json({
    stats,
    submissions: list,
  });
});

// Admin: Update Submission Status
app.patch('/api/admin/submissions/:id', requireAdmin, (req: Request, res: Response) => {
  const id = req.params.id;
  const { status, rejection_reason } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be approved, rejected, or pending.' });
  }

  const updated = db.updateStatus(id, status, rejection_reason);
  if (!updated) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  res.json({
    success: true,
    submission: updated,
  });
});

// Admin: Delete Submission
app.delete('/api/admin/submissions/:id', requireAdmin, (req: Request, res: Response) => {
  const id = req.params.id;
  const item = db.getById(id);

  if (item && item.payment_proof_filename) {
    const filePath = path.join(UPLOADS_DIR, item.payment_proof_filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        console.error('Failed to delete proof file:', e);
      }
    }
  }

  const success = db.delete(id);
  if (!success) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  res.json({ success: true, message: 'Submission deleted.' });
});

// Admin: Securely Stream Payment Proof Image (NOT statically public)
app.get('/api/admin/proof/:id', requireAdmin, (req: Request, res: Response) => {
  const id = req.params.id;
  const record = db.getById(id);

  if (!record || !record.payment_proof_filename) {
    return res.status(404).send('Proof not found');
  }

  const safeFilename = path.basename(record.payment_proof_filename);
  const filePath = path.join(UPLOADS_DIR, safeFilename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Proof image file missing from server');
  }

  res.setHeader('Content-Type', record.payment_proof_mime || 'image/jpeg');
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

// ================= FRONTEND SERVING =================
async function startServer() {
  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static frontend assets from dist in production
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Aplus Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
