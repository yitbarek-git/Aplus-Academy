import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import dotenv from 'dotenv';
import { db } from './server/db';

dotenv.config();

export const app = express();
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL_ENV || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
if (isVercel) app.set('trust proxy', 1);

// Ensure upload directory exists (using /tmp on serverless environments to prevent EROFS)
const BASE_UPLOADS = isVercel ? '/tmp' : process.cwd();
export const UPLOADS_DIR = path.resolve(BASE_UPLOADS, 'uploads', 'proofs');
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Notice: upload dir init:', e);
}

// Basic JSON and URL encoded body parsing
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

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

// Signed, expiring tokens work across serverless instances without relying on
// per-instance memory. Admin access fails closed when no password is configured.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_TOKEN_TTL_SECONDS = 8 * 60 * 60;

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function signAdminToken(payload: string): string {
  return crypto.createHmac('sha256', ADMIN_PASSWORD!).update(payload).digest('hex');
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : (req.headers['x-admin-token'] as string);

  if (!token || !ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized. Admin login required.' });
    return;
  }
  const [expiresAt, nonce, signature, extra] = token.split('.');
  const payload = `${expiresAt}.${nonce}`;
  const expiry = Number(expiresAt);
  if (extra !== undefined || !nonce || !Number.isFinite(expiry) || expiry <= Date.now() / 1000 ||
      !signature || !safeEqual(signature, signAdminToken(payload))) {
    res.status(401).json({ error: 'Admin session expired. Please log in again.' });
    return;
  }
  next();
}

// Baseline browser protections; API responses contain personal and payment data.
app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// ================= API ROUTES ROUTER =================
const router = express.Router();
router.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  next();
});

// Public Config (payment instructions & fees)
router.get('/config', (_req: Request, res: Response) => {
  res.json({
    membershipFee: '400',
    // Keep the existing response key for already-installed clients.
    membershipFeeETB: '400',
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
router.post(
  '/register',
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
      const reject = (status: number, message: string) => {
        if (req.file) {
          try { fs.unlinkSync(req.file.path); } catch (error) { console.warn('Could not remove rejected upload:', error); }
        }
        return res.status(status).json({ error: message });
      };
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
      if (typeof full_name !== 'string' || full_name.trim().length < 3 || full_name.trim().length > 120) {
        return reject(400, 'Please provide a valid full name (at least 3 characters).');
      }

      const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
      const phoneDigits = cleanPhone.replace(/\D/g, '');
      if (cleanPhone.length > 24 || phoneDigits.length < 8 || phoneDigits.length > 15 || !/^\+?[\d\s().-]+$/.test(cleanPhone)) {
        return reject(400, 'Please enter a valid phone number.');
      }

      const cleanTg = typeof telegram_username === 'string' ? telegram_username.trim() : '';
      if (!/^@?[A-Za-z0-9_]{2,32}$/.test(cleanTg)) {
        return reject(400, 'Please enter your Telegram username (so we can grant you group access).');
      }

      const validPaymentMethods = ['telebirr', 'cbe', 'boa'];
      if (typeof payment_method !== 'string' || !validPaymentMethods.includes(payment_method)) {
        return reject(400, 'Please select which payment method you used.');
      }

      const cleanRef = typeof transaction_reference === 'string' ? transaction_reference.trim() : '';
      if (cleanRef.length < 3 || cleanRef.length > 120) {
        return reject(400, 'Please enter the transaction reference or transaction ID from your receipt.');
      }

      if (!req.file) {
        return reject(400, 'Payment proof screenshot is required. Please attach a screenshot of your payment.');
      }

      // Check file signatures as well as client supplied MIME and extension.
      const header = Buffer.alloc(12);
      const fileHandle = fs.openSync(req.file.path, 'r');
      try { fs.readSync(fileHandle, header, 0, header.length, 0); } finally { fs.closeSync(fileHandle); }
      const isJpeg = header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;
      const isPng = header.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      const isWebp = header.toString('ascii', 0, 4) === 'RIFF' && header.toString('ascii', 8, 12) === 'WEBP';
      const matchesDeclaredType = (isJpeg && req.file.mimetype === 'image/jpeg') ||
        (isPng && req.file.mimetype === 'image/png') ||
        (isWebp && req.file.mimetype === 'image/webp');
      if (!matchesDeclaredType) {
        return reject(400, 'The uploaded file is not a valid JPG, PNG, or WEBP image.');
      }

      // Create new pending registration record
      const record = db.create({
        full_name: full_name.trim(),
        phone: cleanPhone,
        telegram_username: cleanTg.startsWith('@') ? cleanTg : `@${cleanTg}`,
        university: typeof university === 'string' ? university.trim().slice(0, 160) : undefined,
        department_year: typeof department_year === 'string' ? department_year.trim().slice(0, 120) : undefined,
        selected_course: typeof selected_course === 'string'
          ? selected_course.trim().slice(0, 160)
          : 'All Courses (Complete Academy Access)',
        payment_method: payment_method.trim(),
        transaction_reference: cleanRef,
        payment_proof_filename: req.file.filename,
        payment_proof_original_name: req.file.originalname,
        payment_proof_mime: req.file.mimetype,
        payment_proof_size: req.file.size,
        message: typeof message === 'string' ? message.trim().slice(0, 1000) : undefined,
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
      if (req.file) {
        try { fs.unlinkSync(req.file.path); } catch (cleanupError) { console.warn('Could not remove failed upload:', cleanupError); }
      }
      console.error('Registration error:', error);
      return res.status(500).json({
        error: 'An unexpected error occurred while processing your registration. Please try again.',
      });
    }
  }
);

// Check Registration Status (by exact phone number or registration ID)
router.get('/status/:query', rateLimiter(30, 5 * 60 * 1000), (req: Request, res: Response) => {
  const query = req.params.query;
  if (!query || query.trim().length < 3) {
    return res.status(400).json({ error: 'Please provide a valid phone number or registration ID.' });
  }

  const record = db.findByPhoneOrQuery(query);
  if (!record) {
    return res.status(404).json({
      error: 'No registration found for this phone number or registration ID. Please verify your input or submit a new registration.',
    });
  }

  // Safe response based on verification status
  if (record.status === 'approved') {
    // Only return the secret Telegram link when verified!
    const inviteLink = process.env.TELEGRAM_PRIVATE_INVITE_LINK;

    return res.json({
      status: 'approved',
      id: record.id,
      full_name: record.full_name,
      created_at: record.created_at,
      reviewed_at: record.reviewed_at,
      ...(inviteLink ? { telegramInviteLink: inviteLink } : {}),
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
router.post('/admin/login', rateLimiter(5, 15 * 60 * 1000), (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'Admin access is unavailable until ADMIN_PASSWORD is configured.' });
  }

  if (safeEqual(password, ADMIN_PASSWORD)) {
    const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_TOKEN_TTL_SECONDS;
    const payload = `${expiresAt}.${crypto.randomBytes(16).toString('hex')}`;
    const token = `${payload}.${signAdminToken(payload)}`;
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
router.post('/admin/logout', requireAdmin, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : (req.headers['x-admin-token'] as string);

  // Tokens are stateless and expire after eight hours; clearing browser storage
  // logs out the current client. A server-side revocation store needs persistence.
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Admin: Get Submissions
router.get('/admin/submissions', requireAdmin, (_req: Request, res: Response) => {
  const list = db.getAll();
  const stats = db.getStats();
  res.json({
    stats,
    submissions: list,
  });
});

// Admin: Update Submission Status
router.patch('/admin/submissions/:id', requireAdmin, (req: Request, res: Response) => {
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
router.delete('/admin/submissions/:id', requireAdmin, (req: Request, res: Response) => {
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
router.get('/admin/proof/:id', requireAdmin, (req: Request, res: Response) => {
  const id = req.params.id;
  const record = db.getById(id);

  if (!record || !record.payment_proof_filename) {
    return res.status(404).send('Proof not found');
  }

  const safeFilename = path.basename(record.payment_proof_filename);
  let filePath = path.join(UPLOADS_DIR, safeFilename);

  if (!fs.existsSync(filePath)) {
    const fallbackPath = path.resolve(process.cwd(), 'uploads', 'proofs', safeFilename);
    if (fs.existsSync(fallbackPath)) {
      filePath = fallbackPath;
    } else {
      const logoPath = path.resolve(process.cwd(), 'public', 'images', 'Logo.webp');
      if (fs.existsSync(logoPath)) {
        filePath = logoPath;
      } else {
        return res.status(404).send('Proof image file missing from server');
      }
    }
  }

  const contentType = ['image/jpeg', 'image/png', 'image/webp'].includes(record.payment_proof_mime)
    ? record.payment_proof_mime
    : 'application/octet-stream';
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

// Mount router on both /api and / to support any Vercel URL rewrite configurations
app.use('/api', router);
app.use('/', router);

// ================= FRONTEND SERVING =================
async function startServer() {
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
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

// In local dev/server environment, start listening. In Vercel serverless environment, export app.
if (!isVercel) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

export default app;
