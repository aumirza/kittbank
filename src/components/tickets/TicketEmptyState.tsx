import { Card, CardContent } from '@/components/ui/card';

export function TicketEmptyState() {
  return (
    <Card className="flex h-full items-center justify-center">
      <CardContent className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <svg
            aria-label="Chat icon"
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Chat icon</title>
            <path
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </div>
        <h3 className="mb-2 font-medium text-sm">No ticket selected</h3>
        <p className="text-muted-foreground text-xs">
          Select a ticket from the list to view its details
        </p>
      </CardContent>
    </Card>
  );
}
