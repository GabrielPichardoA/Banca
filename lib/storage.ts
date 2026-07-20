/**
 * localStorage utilities for user data, tickets, and session persistence
 */

import { User, UserBalance, Ticket, DrawResult, Transaction } from '@/types';

const STORAGE_KEYS = {
  USER: 'lottery_user',
  BALANCE: 'lottery_balance',
  TICKETS: 'lottery_tickets',
  DRAWS: 'lottery_draws',
  TRANSACTIONS: 'lottery_transactions',
  SESSION: 'lottery_session'
};

// User management
export function saveUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function removeUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

// Balance management
export function saveBalance(balance: UserBalance): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.BALANCE, JSON.stringify(balance));
  }
}

export function getBalance(userId: string): UserBalance | null {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.BALANCE);
    if (data) {
      const balance = JSON.parse(data);
      return balance.userId === userId ? balance : null;
    }
  }
  return null;
}

// Ticket management
export function saveTicket(ticket: Ticket): void {
  if (typeof window !== 'undefined') {
    const tickets = getTickets();
    tickets.push(ticket);
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  }
}

export function getTickets(): Ticket[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

export function updateTicket(ticketId: string, updates: Partial<Ticket>): void {
  if (typeof window !== 'undefined') {
    const tickets = getTickets();
    const index = tickets.findIndex(t => t.id === ticketId);
    if (index !== -1) {
      tickets[index] = { ...tickets[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    }
  }
}

// Draw results management
export function saveDraw(draw: DrawResult): void {
  if (typeof window !== 'undefined') {
    const draws = getDraws();
    draws.push(draw);
    localStorage.setItem(STORAGE_KEYS.DRAWS, JSON.stringify(draws));
  }
}

export function getDraws(): DrawResult[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.DRAWS);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

// Transaction management
export function saveTransaction(transaction: Transaction): void {
  if (typeof window !== 'undefined') {
    const transactions = getTransactions();
    transactions.push(transaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }
}

export function getTransactions(): Transaction[] {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  }
  return [];
}

// Session management
export function setSession(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    const session = getSession();
    session[key] = value;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  }
}

export function getSession(): Record<string, any> {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEYS.SESSION);
    return data ? JSON.parse(data) : {};
  }
  return {};
}

// Cleanup
export function clearAllData(): void {
  if (typeof window !== 'undefined') {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}
