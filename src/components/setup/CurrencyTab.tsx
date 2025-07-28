import type { ColumnDef } from '@tanstack/react-table';
import { formatRelative } from 'date-fns';
import {
  FunnelIcon,
  MoreVertical,
  PlusIcon,
  SearchIcon,
  StickyNoteIcon,
  UploadIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useGetAllCurrenciesQuery } from '@/api/queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import type { ICurrency } from '@/types/currency';
import { DataTable } from '../DataTable';
import { AddCurrencyDialog } from './AddCurrencyDialog';

const currencyColumns: ColumnDef<ICurrency>[] = [
  { accessorKey: 'code', header: 'Code' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'symbol', header: 'Symbol' },
  {
    accessorKey: 'value',
    header: () => (
      <span>
        Value in Admin
        <br />
        Region (INR/AED)
      </span>
    ),
  },
  { accessorKey: 'autoUpdate', header: 'Auto-Update' },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => {
      return (
        <div>
          {formatRelative(new Date(row.getValue('updatedAt')), new Date())}
        </div>
      );
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="More actions" size="icon" variant="ghost">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function CurrencyTab() {
  const [search, setSearch] = useState('');
  const { data: currencyData, isLoading } = useGetAllCurrenciesQuery();

  return (
    <Card>
      <CardContent>
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="font-semibold text-lg">Currency list</h2>
        </div>
        <div className="mb-5 flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <SearchIcon
              aria-hidden="true"
              className="-translate-y-1/2 absolute top-1/2 left-5 h-4 w-4 text-muted-foreground"
            />
            <Input
              aria-label="Search currencies"
              className="max-full h-12 rounded-full pl-10"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              value={search}
            />
          </div>
          <div className="grid flex-1 grid-cols-4 gap-2">
            <Button className="h-12 rounded-full" size="sm" variant="outline">
              <FunnelIcon aria-hidden="true" className="mr-2 h-4 w-4" />
              All Filter
            </Button>
            <Button className="h-12 rounded-full" size="sm" variant="outline">
              <StickyNoteIcon aria-hidden="true" className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="h-12 rounded-full" size="sm" variant="outline">
              <UploadIcon aria-hidden="true" className="mr-2 h-4 w-4" />
              Bulk Upload
            </Button>
            <AddCurrencyDialog>
              <Button className="h-12 rounded-full" size="sm" variant="outline">
                <PlusIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                Add
              </Button>
            </AddCurrencyDialog>
          </div>
        </div>
        <DataTable
          columns={currencyColumns}
          data={currencyData?.docs}
          isLoading={isLoading}
          showPagination={true}
          showToolbar={false}
        />
      </CardContent>
    </Card>
  );
}
