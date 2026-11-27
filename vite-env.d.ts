interface ImportMetaEnv {
  readonly VITE_TELEBIRR_ACCOUNT_NAME?: string;
  readonly VITE_TELEBIRR_PHONE_NUMBER?: string;
  readonly VITE_CBE_ACCOUNT_NAME?: string;
  readonly VITE_CBE_ACCOUNT_NUMBER?: string;
  readonly VITE_BOA_ACCOUNT_NAME?: string;
  readonly VITE_BOA_ACCOUNT_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css';
