export type TicketStatus = 'open' | 'closed';

export type TicketCategory =
  | 'Account Configuration'
  | 'Settlement Related'
  | 'Transaction Limit'
  | 'Technical Support'
  | 'General Inquiry';

export interface Ticket {
  id: string;
  title: string;
  category: TicketCategory;
  status: TicketStatus;
  description: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  author: {
    name: string;
    avatar?: string;
  };
  message: string;
  timestamp: Date;
}
