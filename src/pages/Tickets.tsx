import { useMemo, useState } from 'react';
import { useTicketMessagesQuery, useTicketsQuery } from '@/api/tickets';
import { Loader } from '@/components/Loader';
import { PageLayout } from '@/components/PageLayout';
import { TicketDetailView } from '@/components/tickets/TicketDetailView';
import { TicketEmptyState } from '@/components/tickets/TicketEmptyState';
import { TicketList } from '@/components/tickets/TicketList';
import { TicketStatusFilter } from '@/components/tickets/TicketStatusFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Ticket, TicketStatus } from '@/types/ticket';

export default function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [statusFilter, setStatusFilter] = useState<TicketStatus>('open');

  // Fetch tickets from Firebase
  const { data: tickets = [], isLoading: ticketsLoading } = useTicketsQuery();

  // Fetch messages for selected ticket
  const { data: messages = [] } = useTicketMessagesQuery(selectedTicket?.id);

  // Calculate ticket counts for filters
  const ticketCounts = useMemo(() => {
    const all = tickets.length;
    const open = tickets.filter((ticket) => ticket.status === 'open').length;
    const closed = tickets.filter(
      (ticket) => ticket.status === 'closed'
    ).length;

    return { all, open, closed };
  }, [tickets]);

  // Filter tickets based on status
  const filteredTickets = useMemo(() => {
    if (statusFilter === 'open' || statusFilter === 'closed') {
      return tickets.filter((ticket) => ticket.status === statusFilter);
    }
    return tickets;
  }, [tickets, statusFilter]);

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  if (ticketsLoading) {
    return (
      <PageLayout
        className="flex h-[81vh] items-center justify-center"
        description="Manage and track your support requests"
        title="Support Tickets"
      >
        <Loader />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      className="flex h-[81vh] gap-4"
      description="Manage and track your support requests"
      title="Support Tickets"
    >
      {/* Left Panel - Ticket List */}
      <div className="flex w-1/3 flex-col ">
        <Card className="flex h-full flex-col gap-0">
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
              tickets={filteredTickets}
            />
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Ticket Detail */}
      <div className="flex flex-1 flex-col">
        {selectedTicket ? (
          <TicketDetailView messages={messages} ticket={selectedTicket} />
        ) : (
          <TicketEmptyState />
        )}
      </div>
    </PageLayout>
  );
}
