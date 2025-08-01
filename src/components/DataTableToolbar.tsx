'use client';

import type { Table } from '@tanstack/react-table';
import { Download, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTableExportButton } from './DataTableExportButton';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center gap-2 ">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="-translate-y-1/2 absolute top-1/2 left-5 h-4 w-4 text-muted-foreground" />
        <Input
          className="max-full h-12 rounded-full pl-10"
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          placeholder="Search"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        />
      </div>

      <div className="grid flex-1 grid-cols-4 gap-2">
        {/* All Filter Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-12 w-full rounded-full"
              size="sm"
              variant="outline"
            >
              <Filter className="mr-2 h-4 w-4" />
              All Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={!table.getColumn('currency')?.getFilterValue()}
              onCheckedChange={() =>
                table.getColumn('currency')?.setFilterValue('')
              }
            >
              All Currencies
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={!table.getColumn('platform')?.getFilterValue()}
              onCheckedChange={() =>
                table.getColumn('platform')?.setFilterValue('')
              }
            >
              All Platforms
            </DropdownMenuCheckboxItem>
            {isFiltered && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  onCheckedChange={() => table.resetColumnFilters()}
                >
                  Reset All Filters
                </DropdownMenuCheckboxItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Filter */}
        <div className="md:col-span-1">
          <Select
            onValueChange={(value) =>
              table
                .getColumn('date')
                ?.setFilterValue(value === 'all' ? '' : value)
            }
            value={
              (table.getColumn('date')?.getFilterValue() as string) ?? 'all'
            }
          >
            <SelectTrigger className="h-12! w-full rounded-full">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Date</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount Filter */}
        <div className="md:col-span-1">
          <Select
            onValueChange={(value) =>
              table
                .getColumn('amount')
                ?.setFilterValue(value === 'all' ? '' : value)
            }
            value={
              (table.getColumn('amount')?.getFilterValue() as string) ?? 'all'
            }
          >
            <SelectTrigger className="h-12! w-full rounded-full">
              <SelectValue placeholder="Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Amount</SelectItem>
              <SelectItem value="low">$0 - $100</SelectItem>
              <SelectItem value="medium">$100 - $1,000</SelectItem>
              <SelectItem value="high">$1,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Export Button */}
        <DataTableExportButton table={table} />
      </div>
    </div>
  );
}
