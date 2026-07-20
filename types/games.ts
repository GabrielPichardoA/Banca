import { GameType } from './index';

export enum GameSelectionMode {
  MANUAL = 'manual',
  QUICK_PICK = 'quick_pick'
}

export enum QuinielaModalidad {
  EXACTO = 'exacto',
  MIXTO = 'mixto',
  COMBINADO = 'combinado'
}

export interface GameConfig {
  id: GameType;
  name: string;
  description: string;
  minNumbers: number;
  maxNumbers: number;
  numberRange: [number, number];
  pricePerTicket: number; // in crypto (BTC equivalent)
  drawSchedule: {
    days: string[];
    times: string[];
  };
  prizes: PrizeStructure;
  logo?: string; // Path to game logo image
  modalidades?: string[];
  quinielaPalePrizes?: QuinielaPalePrizeTable;
  lotoModalities?: Record<string, LotoModalityConfig>;
}

/**
 * Real Dominican Quiniela/Palé/Tripleta payout structure.
 * Each draw produces 3 winning numbers (00-99): 1er, 2do y 3er premio.
 * Values are the multiplier paid per $1 wagered (mirrors "pesos por cada peso apostado").
 */
export interface QuinielaPalePrizeTable {
  quiniela: {
    first: number;  // matches 1er premio
    second: number; // matches 2do premio
    third: number;  // matches 3er premio
  };
  pale: {
    firstSecond: number; // your 2 numbers = 1er + 2do premio
    firstThird: number;  // your 2 numbers = 1er + 3er premio
    secondThird: number; // your 2 numbers = 2do + 3er premio
  };
  tripleta: {
    allThree: number;  // your 3 numbers = 1er, 2do y 3er premio
    twoOfThree: number; // any 2 of your 3 numbers match 2 of the 3 premios
  };
}

export interface LotoModalityConfig {
  id: string;
  name: string;
  description: string;
  minNumbers: number;
  maxNumbers: number;
  numberRange: [number, number];
  price: number;
  maxPrize: number;
  bonusNumbers?: number; // For MAS and SUPERMAS
  bonusRanges?: Array<[number, number]>; // For multiple bonus numbers
}

export interface PrizeStructure {
  jackpot: PrizeLevel[];
  fixed: PrizeLevel[];
}

export interface PrizeLevel {
  matches: number; // How many numbers must match
  percentage?: number; // Percentage of jackpot (if applicable)
  fixed?: number; // Fixed amount (if applicable)
  modalidad?: string;
}

export interface Ticket {
  id: string;
  userId: string;
  gameType: GameType;
  selectedNumbers: number[];
  modalidad?: string; // For games with modalidades like Quiniela
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  crypto: string;
  usdValue: number;
  purchaseDate: number;
  drawDate: Date;
  transactionHash?: string;
  status: 'active' | 'drawn' | 'expired';
  result?: TicketResult;
}

export interface TicketResult {
  matchedNumbers: number[];
  matchCount: number;
  won: boolean;
  prizeAmount: number;
  prizePercentage?: number;
  resultDate: number;
}

export interface DrawResult {
  id: string;
  gameType: GameType;
  drawnNumbers: number[];
  drawnDate: number;
  drawTime: string;
  jackpotAmount: number;
  totalPrizePool: number;
  ticketsPlayed: number;
}

export interface GameStats {
  gameType: GameType;
  totalTicketsBought: number;
  totalMoneySpent: number;
  totalWinnings: number;
  lastWinDate?: number;
  gamesWon: number;
  winRate: number;
}
