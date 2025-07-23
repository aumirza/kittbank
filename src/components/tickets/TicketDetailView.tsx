import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Ticket, TicketMessage } from '@/types/ticket';
import { RelativeTime } from './RelativeTime';
import { TicketMessageItem } from './TicketMessageItem';
import { TicketStatusBadge } from './TicketStatusBadge';

interface TicketDetailViewProps {
  ticket: Ticket;
  messages: TicketMessage[];
  onSendReply?: (message: string) => void;
}

export function TicketDetailView({ ticket, messages }: TicketDetailViewProps) {
  const ticketMessages = messages.filter((msg) => msg.ticketId === ticket.id);

  return (
    <Card className="flex h-full flex-col">
      {/* Ticket Header */}
      <CardHeader className="border-border border-b">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-3">
              <CardTitle className="text-lg">{ticket.title}</CardTitle>
              <TicketStatusBadge status={ticket.status} />
            </div>

            <div className="mb-3 flex items-center gap-2 text-muted-foreground text-sm">
              <span>#{ticket.id}</span>
              <span>•</span>
              <span>{ticket.category}</span>
              <span>•</span>
              <span>
                Created <RelativeTime date={ticket.createdAt} />
              </span>
            </div>

            <p className="text-muted-foreground text-sm">
              {ticket.description}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          {ticketMessages.length > 0 ? (
            <div className="divide-y divide-border">
              {ticketMessages.map((message) => (
                <TicketMessageItem key={message.id} message={message} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center p-8">
              <p className="text-muted-foreground text-sm">No messages yet</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>

      {/* Reply Section */}
      <CardContent className="border-border border-t p-4">
        <div className="text-center">
          <p className="mb-2 text-muted-foreground text-sm">
            This Request is open and our team is working on it.
          </p>
          <p className="mb-4 text-muted-foreground text-xs">
            you can expect reply before: Apr 2, 2025
          </p>
          <Button size="sm" variant="outline">
            Send a reply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
