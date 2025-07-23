import type { TicketMessage } from '@/types/ticket';
import { RelativeTime } from './RelativeTime';
import { TicketAuthorAvatar } from './TicketAuthorAvatar';

interface TicketMessageItemProps {
  message: TicketMessage;
}

export function TicketMessageItem({ message }: TicketMessageItemProps) {
  return (
    <div className="flex gap-3 p-4">
      <TicketAuthorAvatar
        avatar={message.author.avatar}
        name={message.author.name}
        size="sm"
      />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-medium text-sm">{message.author.name}</span>
          <RelativeTime date={message.timestamp} />
        </div>

        <p className="text-foreground text-sm leading-relaxed">
          {message.message}
        </p>
      </div>
    </div>
  );
}
