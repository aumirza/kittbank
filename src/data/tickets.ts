import type { Ticket, TicketMessage } from '@/types/ticket';

export const mockTickets: Ticket[] = [
  {
    id: 'RT3355894545',
    title: 'Account Configuration',
    category: 'Transaction Limit',
    status: 'open',
    description: 'Stay on top of your finances, all in one place.',
    author: {
      name: 'John Doe',
      avatar: undefined,
    },
    createdAt: new Date('2024-04-03T06:39:00Z'),
    updatedAt: new Date('2024-04-03T06:39:00Z'),
    isActive: true,
  },
  {
    id: 'RT3746687238',
    title: 'Account Configuration',
    category: 'Transaction Limit',
    status: 'open',
    description: 'Stay on top of your finances, all in one place.',
    author: {
      name: 'Jane Smith',
      avatar: undefined,
    },
    createdAt: new Date('2024-04-02T14:20:00Z'),
    updatedAt: new Date('2024-04-02T14:20:00Z'),
    isActive: true,
  },
  {
    id: 'RT3746687239',
    title: 'Account Configuration',
    category: 'Transaction Limit',
    status: 'open',
    description: 'Stay on top of your finances, all in one place.',
    author: {
      name: 'Mike Johnson',
      avatar: undefined,
    },
    createdAt: new Date('2024-04-01T10:15:00Z'),
    updatedAt: new Date('2024-04-01T10:15:00Z'),
    isActive: true,
  },
  {
    id: 'RT3746687240',
    title: 'Account Configuration',
    category: 'Transaction Limit',
    status: 'open',
    description: 'Stay on top of your finances, all in one place.',
    author: {
      name: 'Sarah Wilson',
      avatar: undefined,
    },
    createdAt: new Date('2024-03-31T16:30:00Z'),
    updatedAt: new Date('2024-03-31T16:30:00Z'),
    isActive: true,
  },
  {
    id: 'RT3746687241',
    title: 'Account Configuration',
    category: 'Transaction Limit',
    status: 'open',
    description: 'Stay on top of your finances, all in one place.',
    author: {
      name: 'David Brown',
      avatar: undefined,
    },
    createdAt: new Date('2024-03-30T09:45:00Z'),
    updatedAt: new Date('2024-03-30T09:45:00Z'),
    isActive: true,
  },
  {
    id: 'RT3746687242',
    title: 'Account Configuration',
    category: 'Transaction Limit',
    status: 'open',
    description: 'Stay on top of your finances, all in one place.',
    author: {
      name: 'Emily Davis',
      avatar: undefined,
    },
    createdAt: new Date('2024-03-29T13:20:00Z'),
    updatedAt: new Date('2024-03-29T13:20:00Z'),
    isActive: true,
  },
  {
    id: 'RT3746687243',
    title: 'Account Configuration',
    category: 'Transaction Limit',
    status: 'open',
    description: 'Stay on top of your finances, all in one place.',
    author: {
      name: 'Robert Miller',
      avatar: undefined,
    },
    createdAt: new Date('2024-03-28T11:10:00Z'),
    updatedAt: new Date('2024-03-28T11:10:00Z'),
    isActive: true,
  },
];

export const mockTicketMessages: TicketMessage[] = [
  {
    id: 'msg-1',
    ticketId: 'RT3355894545',
    author: {
      name: 'Subham',
      avatar: undefined,
    },
    message:
      'Dear Sir / Madam, Why our settlement is on hold? We have submitted action for all pending requests.',
    timestamp: new Date('2024-04-03T06:39:00Z'),
  },
  {
    id: 'msg-2',
    ticketId: 'RT3355894545',
    author: {
      name: 'Subham',
      avatar: undefined,
    },
    message:
      'Dear Sir / Madam, Why our settlement is on hold? We have submitted action for all pending requests.',
    timestamp: new Date('2024-04-03T07:45:00Z'),
  },
  {
    id: 'msg-3',
    ticketId: 'RT3355894545',
    author: {
      name: 'Subham',
      avatar: undefined,
    },
    message:
      'Dear Sir / Madam, Why our settlement is on hold? We have submitted action for all pending requests.',
    timestamp: new Date('2024-04-03T08:30:00Z'),
  },
  {
    id: 'msg-4',
    ticketId: 'RT3355894545',
    author: {
      name: 'Subham',
      avatar: undefined,
    },
    message:
      'Dear Sir / Madam, Why our settlement is on hold? We have submitted action for  all pending requests.',
    timestamp: new Date('2024-04-03T09:15:00Z'),
  },
  {
    id: 'msg-5',
    ticketId: 'RT3355894545',
    author: {
      name: 'Subham',
      avatar: undefined,
    },
    message:
      'Dear Sir / Madam, Why our settlement is on hold? We have submitted action for all pending requests.',
    timestamp: new Date('2024-04-03T10:00:00Z'),
  },
];
