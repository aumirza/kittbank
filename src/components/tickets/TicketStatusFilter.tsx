import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { TicketStatus } from '@/types/ticket';

interface TicketStatusFilterProps {
  selectedStatus: TicketStatus;
  onStatusChange: (status: TicketStatus) => void;
  counts?: {
    all: number;
    open: number;
    closed: number;
  };
}

export function TicketStatusFilter({
  selectedStatus,
  onStatusChange,
  counts,
}: TicketStatusFilterProps) {
  return (
    <Tabs
      onValueChange={(value) => onStatusChange(value as TicketStatus)}
      value={selectedStatus}
    >
      <TabsList className="grid w-full grid-cols-2">
        {/* <TabsTrigger className="flex items-center gap-2" value="all">
          All
          <Badge className="ml-1 h-5 px-1.5 text-xs" variant="secondary">
            {counts?.all}
          </Badge>
        </TabsTrigger> */}
        <TabsTrigger className="flex items-center gap-2" value="open">
          Open
          <Badge className="ml-1 h-5 px-1.5 text-xs" variant="secondary">
            {counts?.open ?? 0}
          </Badge>
        </TabsTrigger>
        <TabsTrigger className="flex items-center gap-2" value="closed">
          Closed
          <Badge className="ml-1 h-5 px-1.5 text-xs" variant="secondary">
            {counts?.closed ?? 0}
          </Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
