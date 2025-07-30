import type { TicketMessage } from '@/types/ticket';
import { RelativeTime } from './RelativeTime';
import { TicketAuthorAvatar } from './TicketAuthorAvatar';

interface TicketMessageItemProps {
  message: TicketMessage;
}
const truncateMessage = (text: string, maxLength = 80) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

export function TicketMessageItem({ message }: TicketMessageItemProps) {
  return (
    <div className="flex gap-3 border-b p-4">
      <TicketAuthorAvatar
        avatar={message.author.avatar}
        name={message.author.name}
        size="sm"
      />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="font-medium text-sm">{message.author.name}</span>
          <RelativeTime date={message.timestamp} />
        </div>

        <p className="text-muted-foreground text-sm">
          {truncateMessage(message.message)}
        </p>
      </div>
    </div>
  );
}
