import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TicketStatus } from '@/types/ticket';

interface TicketStatusBadgeProps {
  status: TicketStatus;
  isSelected?: boolean;
}

export function TicketStatusBadge({
  status,
  isSelected = false,
}: TicketStatusBadgeProps) {
  return (
    <Badge
      className={cn('rounded-full bg-transparent py-0.5 text-xs', {
        'border border-green-500 bg-green-300': isSelected,
      })}
      variant="secondary"
    >
      <div className="size-2 rounded-full bg-green-500" />
      {status === 'open' ? 'Active' : 'Closed'}
    </Badge>
  );
}
