import { ScrollArea } from '@/components/ui/scroll-area';
import type { Ticket, TicketStatus } from '@/types/ticket';
import { TicketListItem } from './TicketListItem';

interface TicketListProps {
  tickets: Ticket[];
  selectedTicket?: Ticket;
  onTicketSelect?: (ticket: Ticket) => void;
  filter?: TicketStatus | 'all';
}

export function TicketList({
  tickets,
  selectedTicket,
  onTicketSelect,
  filter = 'all',
}: TicketListProps) {
  const filteredTickets = tickets.filter((ticket) => {
    if (filter === 'all') {
      return true;
    }
    return ticket.status === filter;
  });

  if (filteredTickets.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">No tickets found</p>
          {filter !== 'all' && (
            <p className="text-muted-foreground text-xs">
              Try changing the filter to see more tickets
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 overflow-hidden">
      <div className="space-y-1 p-2">
        {filteredTickets.map((ticket) => (
          <TicketListItem
            isSelected={selectedTicket?.id === ticket.id}
            key={ticket.id}
            onClick={onTicketSelect}
            ticket={ticket}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
