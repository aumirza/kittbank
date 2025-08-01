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
import type { ITransaction } from '@/types/transaction';
import { DataTableColumnHeader } from '../DataTableColumnHeader';

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const transactionColumns: (ColumnDef<ITransaction> & {
  label: string;
  isSearchable?: boolean;
})[] = [
  {
    label: 'Transaction ID',
    accessorKey: 'Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transactions" />
    ),
  },
  {
    label: 'Date',
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    label: 'From',
    accessorKey: 'senderFirstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From" />
    ),
    isSearchable: true,
  },
  {
    label: 'To',
    accessorKey: 'payerFirstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To" />
    ),
    isSearchable: true,
  },
  {
    label: 'Amount',
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));
      return <div className="font-medium">{formatAmount(amount)}</div>;
    },
    filterFn: (row, id, value) => {
      const amount = Number.parseFloat(row.getValue(id));
      if (Number.isNaN(amount)) {
        return false;
      }
      // value is in form "min-max" or "min"
      if (typeof value === 'string') {
        const [min, max] = value.split('-').map(Number);
        if (Number.isNaN(min)) {
          return false;
        } // If min is not a number, skip this row
        if (max !== undefined && Number.isNaN(max)) {
          return false;
        } // If max is not a number, skip this row
        return amount >= min && (max === undefined || amount <= max);
      }
      // If value is a number, compare directly
      if (typeof value === 'number') {
        return amount >= value;
      }
      // If value is not a string or number, skip this row
      return false;
    },
  },
  {
    label: 'Currency',
    accessorKey: 'currency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
  },
  {
    label: 'Platform',
    accessorKey: 'platform',
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
            {/* <DropdownMenuItem>Edit transaction</DropdownMenuItem>
            <DropdownMenuItem>Download receipt</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const transactionFilters: FilterConfig<ITransaction>[] = [
  {
    label: 'Date',
    columnKey: 'date',
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
    columnKey: 'amount',
    type: 'select',
    options: [
      { label: '$0 - $100', value: '0-100' },
      { label: '$100 - $1,000', value: '100-1000' },
      { label: '$1,000+', value: '1000-' },
    ],
  },
];
