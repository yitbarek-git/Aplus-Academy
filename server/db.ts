import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface Registration {
  id: string;
  full_name: string;
  phone: string;
  telegram_username: string;
  university?: string;
  department_year?: string;
  selected_course?: string;
  payment_method: string;
  transaction_reference: string;
  payment_proof_filename: string;
  payment_proof_original_name: string;
  payment_proof_mime: string;
  payment_proof_size: number;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string | null;
  created_at: string;
  reviewed_at?: string | null;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'registrations.json');

// Ensure directory and file exist
function initDb(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

initDb();

function readRegistrations(): Registration[] {
  try {
    initDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as Registration[];
  } catch (err) {
    console.error('Error reading database file:', err);
    return [];
  }
}

function writeRegistrations(data: Registration[]): void {
  try {
    initDb();
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error writing to database file:', err);
    throw new Error('Failed to save registration record');
  }
}

export const db = {
  getAll(): Registration[] {
    return readRegistrations().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getById(id: string): Registration | undefined {
    const list = readRegistrations();
    return list.find((item) => item.id === id);
  },

  findByPhoneOrQuery(query: string): Registration | undefined {
    const list = readRegistrations();
    const cleanQuery = query.trim().toLowerCase().replace(/[\s\-\+]/g, '');
    
    return list.find((item) => {
      const cleanPhone = (item.phone || '').trim().toLowerCase().replace(/[\s\-\+]/g, '');
      const cleanRef = (item.transaction_reference || '').trim().toLowerCase();
      const cleanId = item.id.toLowerCase();
      const cleanTg = (item.telegram_username || '').trim().toLowerCase().replace('@', '');

      return (
        cleanPhone === cleanQuery ||
        cleanPhone.endsWith(cleanQuery) ||
        cleanQuery.endsWith(cleanPhone) ||
        cleanRef === cleanQuery ||
        cleanId === cleanQuery ||
        cleanTg === cleanQuery
      );
    });
  },

  create(data: Omit<Registration, 'id' | 'status' | 'created_at' | 'reviewed_at'>): Registration {
    const list = readRegistrations();
    const newRecord: Registration = {
      ...data,
      id: `APL-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      status: 'pending',
      rejection_reason: null,
      created_at: new Date().toISOString(),
      reviewed_at: null,
    };

    list.unshift(newRecord);
    writeRegistrations(list);
    return newRecord;
  },

  updateStatus(id: string, status: 'approved' | 'rejected' | 'pending', rejection_reason?: string): Registration | null {
    const list = readRegistrations();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    list[index].status = status;
    list[index].rejection_reason = rejection_reason || null;
    list[index].reviewed_at = new Date().toISOString();

    writeRegistrations(list);
    return list[index];
  },

  delete(id: string): boolean {
    const list = readRegistrations();
    const filtered = list.filter((item) => item.id !== id);
    if (filtered.length === list.length) return false;
    writeRegistrations(filtered);
    return true;
  },

  getStats() {
    const list = readRegistrations();
    return {
      total: list.length,
      pending: list.filter((r) => r.status === 'pending').length,
      approved: list.filter((r) => r.status === 'approved').length,
      rejected: list.filter((r) => r.status === 'rejected').length,
    };
  },
};
