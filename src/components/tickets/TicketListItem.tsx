import { cn } from '@/lib/utils';
import type { Ticket } from '@/types/ticket';
import { TicketAuthorAvatar } from './TicketAuthorAvatar';
import { TicketStatusBadge } from './TicketStatusBadge';

interface TicketListItemProps {
  ticket: Ticket;
  isSelected?: boolean;
  onClick?: (ticket: Ticket) => void;
}

export function TicketListItem({
  ticket,
  isSelected = false,
  onClick,
}: TicketListItemProps) {
  const handleClick = () => {
    onClick?.(ticket);
  };

  return (
    <button
      className={cn(
        'flex w-full cursor-pointer items-start gap-3 border-border border-b p-4 text-left transition-colors hover:bg-muted/50',
        isSelected && 'bg-amber-50'
      )}
      onClick={handleClick}
      type="button"
    >
      <TicketAuthorAvatar
        avatar={ticket.author.avatar}
        name={ticket.author.name}
      />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="truncate font-medium text-sm">{ticket.title}</h3>
          <TicketStatusBadge isSelected={isSelected} status={ticket.status} />
        </div>
        <div className="flex items-center justify-between gap-1 text-muted-foreground text-xs">
          <span>{ticket.category}</span>
          <span className="">#{ticket.id}</span>
        </div>

        <p className="text-muted-foreground text-xs leading-relaxed">
          {ticket.description}
        </p>
      </div>
    </button>
  );
}
