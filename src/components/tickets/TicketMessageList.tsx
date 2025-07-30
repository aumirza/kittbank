import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { TicketMessage } from '@/types/ticket';
import { TicketMessageItem } from './TicketMessageItem';

interface TicketMessageListProps {
  messages: TicketMessage[];
}

export function TicketMessageList({ messages }: TicketMessageListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine which messages to show
  const getVisibleMessages = () => {
    if (messages.length <= 3 || isExpanded) {
      return messages;
    }

    // Show first 2 and last message when collapsed
    const firstTwo = messages.slice(0, 2);
    const lastMessage = messages.at(-1);
    return lastMessage ? [...firstTwo, lastMessage] : firstTwo;
  };

  const visibleMessages = getVisibleMessages();
  const hiddenMessagesCount = messages.length - 3; // Total - (first 2 + last 1)
  const shouldShowToggle = messages.length > 3;

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground text-sm">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="">
      {/* Always show first 2 messages */}
      {visibleMessages.slice(0, 2).map((message) => (
        <TicketMessageItem key={message.id} message={message} />
      ))}

      {/* Show expand/collapse button and handle middle messages */}
      {shouldShowToggle && !isExpanded && (
        <div className="-mt-3 flex justify-center">
          <Button
            className="z-10 flex h-6 items-center rounded-full text-xs"
            onClick={() => setIsExpanded(true)}
            size="sm"
            variant="outline"
          >
            <ChevronDown className="h-4 w-4" />
            Show {hiddenMessagesCount} more{' '}
            {hiddenMessagesCount === 1 ? 'message' : 'messages'}
          </Button>
        </div>
      )}

      {shouldShowToggle && isExpanded && (
        <>
          {/* Show middle messages when expanded */}
          {messages.slice(2, -1).map((message) => (
            <TicketMessageItem key={message.id} message={message} />
          ))}
          <div className="-mt-3 relative flex items-center justify-center">
            <Button
              className="z-10 flex h-6 items-center rounded-full text-xs"
              onClick={() => setIsExpanded(false)}
              size="sm"
              variant="outline"
            >
              <ChevronUp className="h-4 w-4" />
              Show less
            </Button>
          </div>
        </>
      )}

      {/* Show last message when there are more than 3 messages, or remaining messages when 3 or fewer */}
      {shouldShowToggle
        ? messages.at(-1) && (
            <TicketMessageItem
              key={messages.at(-1)?.id}
              message={messages.at(-1) as TicketMessage}
            />
          )
        : visibleMessages
            .slice(2)
            .map((message) => (
              <TicketMessageItem key={message.id} message={message} />
            ))}
    </div>
  );
}
