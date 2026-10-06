export interface PaymentMethodConfig {
  id: string;
  name: string;
  accountName: string;
  accountNumber: string;
  badge?: string;
  steps: string[];
}

export interface AppConfig {
  membershipFeeETB: string;
  currency: string;
  oneTimeOnly: boolean;
  paymentMethods: PaymentMethodConfig[];
  supportContacts: {
    telegram: string;
    telegramChannel: string;
    youtube: string;
    email: string;
  };
}

export interface RegistrationSubmission {
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

export interface StatusResult {
  status: 'pending' | 'approved' | 'rejected';
  id?: string;
  full_name?: string;
  telegram_username?: string;
  created_at?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  telegramInviteLink?: string;
  message: string;
}
