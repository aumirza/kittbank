import { useMemo, useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { TicketDetailView } from '@/components/tickets/TicketDetailView';
import { TicketEmptyState } from '@/components/tickets/TicketEmptyState';
import { TicketList } from '@/components/tickets/TicketList';
import { TicketStatusFilter } from '@/components/tickets/TicketStatusFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockTicketMessages, mockTickets } from '@/data/tickets';
import type { Ticket, TicketStatus } from '@/types/ticket';

export default function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [statusFilter, setStatusFilter] = useState<TicketStatus>('open');

  // Calculate ticket counts for filters
  const ticketCounts = useMemo(() => {
    const all = mockTickets.length;
    const open = mockTickets.filter(
      (ticket) => ticket.status === 'open'
    ).length;
    const closed = mockTickets.filter(
      (ticket) => ticket.status === 'closed'
    ).length;

    return { all, open, closed };
  }, []);

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <PageLayout
      className="flex h-[81vh] gap-4"
      description="Manage and track your support requests"
      title="Support Tickets"
    >
      {/* Left Panel - Ticket List */}
      <div className="flex w-1/3 min-w-[400px] flex-col">
        <Card className="flex h-full flex-col">
          <CardHeader className="border-border border-b pb-4">
            <div className="flex items-center justify-between">
              <CardTitle>Support Request</CardTitle>
            </div>
            <TicketStatusFilter
              counts={ticketCounts}
              onStatusChange={setStatusFilter}
              selectedStatus={statusFilter}
            />
          </CardHeader>

          <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
            <TicketList
              filter={statusFilter}
              onTicketSelect={handleTicketSelect}
              selectedTicket={selectedTicket}
              tickets={mockTickets}
            />
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Ticket Detail */}
      <div className="flex flex-1 flex-col">
        {selectedTicket ? (
          <TicketDetailView
            messages={mockTicketMessages}
            ticket={selectedTicket}
          />
        ) : (
          <TicketEmptyState />
        )}
      </div>
    </PageLayout>
  );
}
