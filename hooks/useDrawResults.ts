import { useQuery } from '@tanstack/react-query';
import { getDraws } from '@/lib/storage';
import { DrawResult, GameType } from '@/types';

export function useDrawResults(gameType?: GameType) {
  const query = useQuery({
    queryKey: ['draws', gameType],
    queryFn: () => {
      const allDraws = getDraws();
      return gameType ? allDraws.filter(d => d.gameType === gameType) : allDraws;
    }
  });

  return {
    results: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    latestResult: query.data?.[query.data.length - 1]
  };
}
