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
      className={cn('rounded-full bg-transparent py-0 text-xs', {
        'border border-green-400 bg-green-100': isSelected,
      })}
      variant="secondary"
    >
      <div className="size-2 rounded-full bg-green-400" />
      {status === 'open' ? 'Active' : 'Closed'}
    </Badge>
  );
}
