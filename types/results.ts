import { GameType } from './index';

export interface ResultsFilter {
  gameType?: GameType;
  startDate?: number;
  endDate?: number;
  limit?: number;
  offset?: number;
}

export interface DrawResultsPage {
  results: DrawResultDetail[];
  total: number;
  hasMore: boolean;
}

export interface DrawResultDetail {
  id: string;
  gameType: GameType;
  gameName: string;
  drawnNumbers: number[];
  drawnDate: Date;
  drawTime: string;
  nextDrawDate?: Date;
  nextDrawTime?: string;
  jackpotAmount: number;
  additionalPrizes?: {
    name: string;
    amount: number;
  }[];
  ticketsPlayed: number;
  totalPrizePool: number;
}

export interface UserTicketsFilter {
  userId: string;
  status?: 'active' | 'drawn' | 'expired' | 'won' | 'lost';
  gameType?: GameType;
  startDate?: number;
  endDate?: number;
  limit?: number;
  offset?: number;
}

export interface UserTicketsPage {
  tickets: TicketWithResult[];
  total: number;
  hasMore: boolean;
  stats: {
    totalTickets: number;
    totalSpent: number;
    totalWon: number;
    winCount: number;
  };
}

export interface TicketWithResult {
  id: string;
  gameType: string;
  gameName: string;
  selectedNumbers: number[];
  purchaseDate: Date;
  drawDate: Date;
  pricePerUnit: number;
  quantity: number;
  status: string;
  result?: {
    drawnNumbers: number[];
    matchedCount: number;
    won: boolean;
    prizeAmount: number;
  };
}
