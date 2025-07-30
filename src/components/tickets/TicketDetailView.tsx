import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Ticket, TicketMessage } from '@/types/ticket';
import { TicketMessageList } from './TicketMessageList';
import { TicketReplyBox } from './TicketReplyBox';
import { TicketStatusBadge } from './TicketStatusBadge';

interface TicketDetailViewProps {
  ticket: Ticket;
  messages: TicketMessage[];
  onSendReply?: (message: string) => void;
}

export function TicketDetailView({
  ticket,
  messages,
  onSendReply,
}: TicketDetailViewProps) {
  const ticketMessages = messages.filter((msg) => msg.ticketId === ticket.id);

  return (
    <Card className="flex h-full flex-col gap-0 py-2">
      {/* Ticket Header */}
      <CardHeader>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              <CardTitle className="text-lg">{ticket.title}</CardTitle>
              <span>{'>>'}</span>
              <span>{ticket.category}</span>
            </div>

            <TicketStatusBadge isSelected status={ticket.status} />
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>{ticket.createdAt.toLocaleString()}</span>
            <span>•</span>
            <span>#{ticket.id}</span>
          </div>
          {/* 
            <p className="text-muted-foreground text-sm">
              {ticket.description}
            </p> */}
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="overflow-hidden p-3">
        <ScrollArea className="h-full rounded-lg border">
          <TicketMessageList messages={ticketMessages} />
        </ScrollArea>
      </CardContent>

      {/* Reply Section */}
      <CardFooter className="flex items-center justify-center px-3">
        <TicketReplyBox onSendReply={onSendReply} />
      </CardFooter>
    </Card>
  );
}
