import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const tickets = [
  {
    amount: 2480.75,
    date: '2025-07-14',
    label: 'Tuition Fee',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    amount: 129.99,
    date: '2025-07-16',
    label: 'Spotify Family',
    color: 'bg-green-100 text-green-800',
  },
  {
    amount: 3200.0,
    date: '2025-07-18',
    label: 'Rent',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    amount: 95.5,
    date: '2025-07-20',
    label: 'Electric Bill',
    color: 'bg-indigo-100 text-indigo-800',
  },
];

function formatDate(dateStr: string): string {
  // Ensure correct function declaration
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function TicketsCard() {
  // Ensure correct return type

  return (
    <Card className="rounded-2xl bg-white p-4 shadow-sm">
      <CardContent className="p-0">
        <h2 className="mb-4 font-semibold text-lg">Ticket</h2>
        <ul className="mb-6 space-y-4">
          {tickets.map((ticket) => (
            <li
              className="flex items-center justify-between"
              key={ticket.label}
            >
              <div>
                <div className="font-semibold text-gray-900 text-lg">
                  $
                  {ticket.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-gray-500 text-xs">
                  {formatDate(ticket.date)}
                </div>
              </div>
              <Badge
                aria-label={ticket.label}
                className={`ml-2 rounded-full px-4 py-1 font-medium text-xs ${ticket.color}`}
              >
                {ticket.label}
              </Badge>
            </li>
          ))}
        </ul>
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-full border-gray-200 py-6 font-normal text-base"
          type="button"
          variant="outline"
        >
          View All Tickets
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
