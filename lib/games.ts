/**
 * Game logic utilities
 * Handles ticket creation, prize calculation, and game rules
 */

import { Ticket, TicketResult, GameType, DrawResult, QuinielaPalePrizeTable } from '@/types';
import { GAMES_CONFIG } from './gameConfig';
import { compareNumbers } from './numbers';

/**
 * Calculate prize for a winning ticket
 */
export function calculatePrize(
  ticket: Ticket,
  drawResult: DrawResult,
  matchCount: number
): number {
  const gameConfig = GAMES_CONFIG[ticket.gameType];
  const prizeStructure = gameConfig.prizes;

  // For jackpot games (Loto, Loto Pool)
  if (prizeStructure.jackpot.length > 0) {
    const prizeLevel = prizeStructure.jackpot.find(p => p.matches === matchCount);
    if (prizeLevel && prizeLevel.percentage) {
      // Jackpot prize is percentage of total pool
      const prizeAmount = (drawResult.jackpotAmount * prizeLevel.percentage) / 100;
      return prizeAmount * ticket.quantity;
    }
  }

  // For fixed prize games (KinoTV, Quiniela, Pega3)
  if (prizeStructure.fixed.length > 0) {
    let prizeLevel;
    if (ticket.modalidad) {
      // Games with modalidades (Quiniela, Pega3)
      prizeLevel = prizeStructure.fixed.find(
        p => p.matches === matchCount && p.modalidad === ticket.modalidad
      );
    } else {
      // Games without modalidades
      prizeLevel = prizeStructure.fixed.find(p => p.matches === matchCount);
    }

    if (prizeLevel && prizeLevel.fixed) {
      return prizeLevel.fixed * ticket.quantity;
    }
  }

  return 0;
}

/**
 * Calculate the payout for a real Dominican Quiniela/Pale/Tripleta bet.
 * Each draw produces exactly 3 winning numbers: [1er premio, 2do premio, 3er premio].
 * `betAmount` is multiplied by the matching position's payout ratio (e.g. 60x for hitting
 * the 1er premio in Quiniela), mirroring "pesos por cada peso apostado" in real bancas.
 */
export function calculateQuinielaPalePrize(
  modalidad: 'quiniela' | 'pale' | 'tripleta',
  selectedNumbers: number[],
  drawnNumbers: number[],
  betAmount: number,
  prizeTable: QuinielaPalePrizeTable
): number {
  const [first, second, third] = drawnNumbers;

  if (modalidad === 'quiniela') {
    const [n] = selectedNumbers;
    if (n === first) return betAmount * prizeTable.quiniela.first;
    if (n === second) return betAmount * prizeTable.quiniela.second;
    if (n === third) return betAmount * prizeTable.quiniela.third;
    return 0;
  }

  if (modalidad === 'pale') {
    const [a, b] = selectedNumbers;
    const isPair = (x: number, y: number) => (a === x && b === y) || (a === y && b === x);
    if (isPair(first, second)) return betAmount * prizeTable.pale.firstSecond;
    if (isPair(first, third)) return betAmount * prizeTable.pale.firstThird;
    if (isPair(second, third)) return betAmount * prizeTable.pale.secondThird;
    return 0;
  }

  // tripleta
  const drawnSet = new Set([first, second, third]);
  const matchCount = new Set(selectedNumbers).size === 3
    ? selectedNumbers.filter(n => drawnSet.has(n)).length
    : 0;
  if (matchCount === 3) return betAmount * prizeTable.tripleta.allThree;
  if (matchCount === 2) return betAmount * prizeTable.tripleta.twoOfThree;
  return 0;
}

/**
 * Check if ticket won and create result
 */
export function checkTicketWinner(
  ticket: Ticket,
  drawResult: DrawResult
): TicketResult | null {
  const prizeTable = GAMES_CONFIG[ticket.gameType].quinielaPalePrizes;

  // Real position-based Quiniela/Pale/Tripleta bank games
  if (prizeTable && ticket.modalidad && ticket.modalidad in prizeTable) {
    const prizeAmount = calculateQuinielaPalePrize(
      ticket.modalidad as 'quiniela' | 'pale' | 'tripleta',
      ticket.selectedNumbers,
      drawResult.drawnNumbers,
      ticket.totalPrice,
      prizeTable
    );

    if (prizeAmount === 0) return null;

    const drawnSet = new Set(drawResult.drawnNumbers);
    return {
      matchedNumbers: ticket.selectedNumbers.filter(n => drawnSet.has(n)),
      matchCount: ticket.selectedNumbers.filter(n => drawnSet.has(n)).length,
      won: true,
      prizeAmount,
      resultDate: Date.now()
    };
  }

  // Loto, KinoTV, Loto Pool, Pega3, Super Pale: match-count based games
  const matchCount = compareNumbers(ticket.selectedNumbers, drawResult.drawnNumbers);

  if (matchCount === 0) {
    return null; // No win
  }

  // For games like Pega3 that need modalidad match logic
  // This is simplified - full logic would validate modalidad-specific rules
  const minMatchForPrize = Math.max(
    GAMES_CONFIG[ticket.gameType].minNumbers - 3,
    3
  );

  if (matchCount < minMatchForPrize) {
    return null; // Not enough matches
  }

  const prizeAmount = calculatePrize(ticket, drawResult, matchCount);

  return {
    matchedNumbers: ticket.selectedNumbers.filter(n =>
      drawResult.drawnNumbers.includes(n)
    ),
    matchCount,
    won: prizeAmount > 0,
    prizeAmount,
    resultDate: Date.now()
  };
}

/**
 * Validate ticket numbers before purchase
 */
export function validateTicketNumbers(
  gameType: GameType,
  numbers: number[],
  modalidad?: string
): { valid: boolean; error?: string } {
  const config = GAMES_CONFIG[gameType];

  // Quiniela/Pale/Tripleta bank games require a different number count per modalidad
  // (1 for Quiniela, 2 for Pale, 3 for Tripleta), not a single fixed minNumbers.
  const requiredCount = config.quinielaPalePrizes
    ? { quiniela: 1, pale: 2, tripleta: 3 }[modalidad as 'quiniela' | 'pale' | 'tripleta']
    : config.minNumbers;

  if (requiredCount === undefined) {
    return { valid: false, error: `Modalidad inválida: ${modalidad}` };
  }

  if (numbers.length !== requiredCount) {
    return {
      valid: false,
      error: `Se requieren exactamente ${requiredCount} números`
    };
  }

  // Check range
  const [min, max] = config.numberRange;
  for (const num of numbers) {
    if (num < min || num > max) {
      return {
        valid: false,
        error: `Los números deben estar entre ${min} y ${max}`
      };
    }
  }

  // Check duplicates
  if (new Set(numbers).size !== numbers.length) {
    return {
      valid: false,
      error: 'No puede haber números duplicados'
    };
  }

  // Validate modalidad if needed
  if (config.modalidades) {
    if (!modalidad || !config.modalidades.includes(modalidad)) {
      return {
        valid: false,
        error: `Modalidad inválida: ${modalidad}`
      };
    }
  }

  return { valid: true };
}

/**
 * Create a new ticket object
 */
export function createTicket(
  userId: string,
  gameType: GameType,
  selectedNumbers: number[],
  quantity: number,
  cryptoAmount: number,
  cryptoType: string,
  usdValue: number,
  modalidad?: string,
  drawDate?: Date
): Ticket {
  const gameConfig = GAMES_CONFIG[gameType];

  return {
    id: generateTicketId(),
    userId,
    gameType,
    selectedNumbers,
    quantity,
    pricePerUnit: cryptoAmount / quantity,
    totalPrice: cryptoAmount,
    crypto: cryptoType,
    usdValue,
    purchaseDate: Date.now(),
    drawDate: drawDate || new Date(),
    status: 'active',
    modalidad
  };
}

/**
 * Generate unique ticket ID
 */
export function generateTicketId(): string {
  return `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get winning tickets for a draw
 */
export function getWinningTickets(
  tickets: Ticket[],
  drawResult: DrawResult
): Array<{ ticket: Ticket; result: TicketResult }> {
  return tickets
    .filter(t => t.gameType === drawResult.gameType && t.status === 'active')
    .map(ticket => {
      const result = checkTicketWinner(ticket, drawResult);
      return { ticket, result };
    })
    .filter((item): item is { ticket: Ticket; result: TicketResult } => item.result !== null);
}
