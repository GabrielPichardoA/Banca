import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Ticket, GameType, GameStats } from '@/types';
import { getTickets } from '@/lib/storage';

export function useGameStats(gameType?: GameType) {
  const { user } = useAuth();

  const stats = useMemo(() => {
    if (!user) return null;

    const allTickets = getTickets().filter(t => t.userId === user.id);
    const gameTickets = gameType ? allTickets.filter(t => t.gameType === gameType) : allTickets;

    const totalTickets = gameTickets.reduce((sum, t) => sum + t.quantity, 0);
    const totalSpent = gameTickets.reduce((sum, t) => sum + t.usdValue, 0);
    const totalWon = gameTickets
      .filter(t => t.result?.won)
      .reduce((sum, t) => sum + (t.result?.prizeAmount || 0), 0);
    const gamesWon = gameTickets.filter(t => t.result?.won).length;

    return {
      gameType: gameType || ('ALL' as any),
      totalTicketsBought: totalTickets,
      totalMoneySpent: totalSpent,
      totalWinnings: totalWon,
      gamesWon,
      winRate: totalTickets > 0 ? (gamesWon / totalTickets) * 100 : 0
    } as GameStats;
  }, [user, gameType]);

  return stats;
}
