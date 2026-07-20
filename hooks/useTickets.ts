import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getTickets, updateTicket, saveTicket } from '@/lib/storage';
import { Ticket } from '@/types';

export function useTickets(userId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['tickets', userId || user?.id],
    queryFn: () => {
      const allTickets = getTickets();
      return (userId || user?.id) ? allTickets.filter(t => t.userId === (userId || user?.id)) : allTickets;
    },
    enabled: !!userId || !!user
  });

  const addTicketMutation = useMutation({
    mutationFn: (ticket: Ticket) => {
      saveTicket(ticket);
      return Promise.resolve(ticket);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    }
  });

  const updateTicketMutation = useMutation({
    mutationFn: ({ ticketId, updates }: { ticketId: string; updates: Partial<Ticket> }) => {
      updateTicket(ticketId, updates);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    }
  });

  return {
    tickets: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    addTicket: addTicketMutation.mutate,
    updateTicket: updateTicketMutation.mutate
  };
}
