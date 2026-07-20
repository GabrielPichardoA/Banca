// Core type exports
export * from './games';
export * from './user';
export * from './results';

// Enums
export enum GameType {
  LOTO = 'loto',
  KINO_TV = 'kino-tv',
  LOTO_POOL = 'loto-pool',
  QUINIELA = 'quiniela',
  PEGA3 = 'pega3',
  LOTERIA_NACIONAL = 'loteria-nacional',
  LOTEKA = 'loteka',
  LA_SUERTE = 'la-suerte',
  LOTERIA_REAL = 'loteria-real'
}

// Sub-types for Quiniela Pale game (4 modalities)
export enum QuinielaModality {
  QUINIELA = 'quiniela',
  PALE = 'pale',
  TRIPLETA = 'tripleta',
  SUPER_PALE = 'super-pale'
}

export enum LotoModality {
  LOTO = 'loto',
  MAS = 'mas',
  SUPERMAS = 'supermas'
}

export enum CryptoType {
  USDT = 'USDT',
  USDC = 'USDC',
  USD = 'USD'
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed'
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'purchase' | 'prize' | 'deposit' | 'withdrawal';
  amount: number;
  crypto: CryptoType;
  usdValue: number;
  status: TransactionStatus;
  hash?: string;
  timestamp: number;
  ticketId?: string;
}
