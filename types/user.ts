import { GameStats, Transaction } from './index';

export interface User {
  id: string;
  email: string;
  password?: string; // Only in localStorage, never sent to server
  name: string;
  createdAt: number;
  lastLogin: number;
  walletAddress?: string;
  isLoggedIn: boolean;
}

export interface UserBalance {
  userId: string;
  balances: CryptoBalance[];
  totalUsdValue: number;
  lastUpdated: number;
}

export interface CryptoBalance {
  crypto: string;
  amount: number;
  usdValue: number;
}

export interface UserProfile extends User {
  balance: UserBalance;
  stats: GameStats[];
  totalWinnings: number;
  transactions: Transaction[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}
