'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { FilterConfig } from '@/types/filter';
import type { IUserListItem } from '@/types/user';
import { DataTableColumnHeader } from '../DataTableColumnHeader';

export const userColumns: (ColumnDef<IUserListItem> & {
  label: string;
  isSearchable?: boolean;
})[] = [
  {
    label: 'User ID',
    accessorKey: '_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
  },
  {
    label: 'Name',
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    isSearchable: true,
  },
  {
    label: 'Total Transactions',
    accessorKey: 'totalTransaction',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Transaction" />
    ),
  },
  {
    label: 'To Pending Ticket',
    accessorKey: 'toPendingTicket',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To Pending Ticket" />
    ),
  },
  {
    label: 'Total Amount',
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    // cell: ({ row }) => {
    //   const amount = Number.parseFloat(row.getValue('amount'));
    //   return <div className="font-medium">{amount}</div>;
    // },
  },
  {
    label: 'currency',
    accessorKey: 'currency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
  },
  {
    label: 'Platform',
    accessorKey: 'platForm',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platform" />
    ),
  },
  {
    label: 'Actions',
    id: 'actions',
    header: 'Actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const userFilters: FilterConfig<IUserListItem>[] = [
  {
    label: 'Date',
    columnKey: 'createdAt',
    type: 'select',
    options: [
      { label: 'Today', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'This Week', value: 'week' },
      { label: 'This Month', value: 'month' },
    ],
  },
  {
    label: 'Amount',
    columnKey: 'totalTransaction',
    type: 'select',
    options: [
      { label: '$0 - $100', value: '0-100' },
      { label: '$100 - $1,000', value: '100-1000' },
      { label: '$1,000+', value: '1000-' },
    ],
  },
];
