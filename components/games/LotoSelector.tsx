'use client';

import UnifiedLotoGame from './UnifiedLotoGame';

interface TicketSelection {
  id: string;
  modalidad: 'loto' | 'mas' | 'supermas';
  numbers: number[];
  bonus1?: number;
  bonus2?: number;
  price: number;
}

interface LotoSelectorProps {
  onSelect: (data: TicketSelection[] | number[], modalidad?: string) => void;
  isLoading?: boolean;
}

export default function LotoSelector({ onSelect, isLoading }: LotoSelectorProps) {
  const handleSelectTickets = (tickets: TicketSelection[]) => {
    // Para mantener compatibilidad, si hay un solo ticket, pasamos los números directamente
    // Si hay múltiples, pasamos todo el array
    if (tickets.length === 1) {
      const ticket = tickets[0];
      onSelect([...ticket.numbers, ticket.bonus1, ticket.bonus2].filter(n => n !== undefined) as number[], ticket.modalidad);
    } else {
      onSelect(tickets);
    }
  };

  return <UnifiedLotoGame onSelect={handleSelectTickets} isLoading={isLoading} />;
}
