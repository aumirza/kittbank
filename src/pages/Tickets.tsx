import { useMemo, useState } from 'react';
import {
  useTicketCountsQuery,
  useTicketMessagesQuery,
  useTicketsByStatusQuery,
} from '@/api/tickets';
import { PageLayout } from '@/components/PageLayout';
import { TicketDetailView } from '@/components/tickets/TicketDetailView';
import { TicketEmptyState } from '@/components/tickets/TicketEmptyState';
import { TicketList } from '@/components/tickets/TicketList';
import { TicketStatusFilter } from '@/components/tickets/TicketStatusFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Ticket, TicketStatus } from '@/types/ticket';

export default function Tickets() {
  const skeletonKeys = useMemo(() => ['a', 'b', 'c', 'd', 'e', 'f'], []);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [statusFilter, setStatusFilter] = useState<TicketStatus>('open');

  // Fetch tickets by selected status (reduces payload)
  const {
    data: tickets = [],
    isLoading: ticketsLoading,
    isFetching: ticketsFetching,
  } = useTicketsByStatusQuery(statusFilter);

  // Lightweight counts for tabs
  const { data: counts } = useTicketCountsQuery();

  // Fetch messages for selected ticket
  const { data: messages = [] } = useTicketMessagesQuery(selectedTicket?.id);

  // Tickets already filtered on server; keep memo for stability
  const filteredTickets = useMemo(() => tickets, [tickets]);

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
      <div className="flex w-1/3 flex-col ">
        <Card className="flex h-full flex-col gap-0">
          <CardHeader className="border-border border-b pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Support Request
                {ticketsFetching ? (
                  <span className="text-muted-foreground text-xs">
                    Updating…
                  </span>
                ) : null}
              </CardTitle>
            </div>
            <TicketStatusFilter
              counts={counts}
              onStatusChange={setStatusFilter}
              selectedStatus={statusFilter}
            />
          </CardHeader>

          <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
            {ticketsLoading && filteredTickets.length === 0 ? (
              <div className="space-y-1 p-2">
                {skeletonKeys.map((key) => (
                  <div
                    className="flex items-start gap-3 rounded-md p-2"
                    key={key}
                  >
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <TicketList
                filter={statusFilter}
                onTicketSelect={handleTicketSelect}
                selectedTicket={selectedTicket}
                tickets={filteredTickets}
              />
            )}
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
