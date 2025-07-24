import {
  FunnelIcon,
  MoreVertical,
  PlusIcon,
  SearchIcon,
  StickyNoteIcon,
  UploadIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { DataTable } from '../DataTable';
import { AddCurrencyDialog } from './AddCurrencyDialog';

export function CurrencyTab() {
  const [search, setSearch] = useState('');

  const currencyData = [
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      value: '₹83.12',
      autoUpdate: 'ON',
      lastUpdated: 'Apr 18, 2025 10:42',
    },
    {
      code: 'AED',
      name: 'UAE Dirham',
      symbol: 'د.إ',
      value: '₹22.64',
      autoUpdate: 'ON',
      lastUpdated: 'Apr 18, 2025 10:42',
    },
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      value: '₹89.45',
      autoUpdate: 'ON',
      lastUpdated: 'Apr 18, 2025 10:42',
    },
    {
      code: 'JPY',
      name: 'Japanese Yen',
      symbol: '¥',
      value: '₹0.56',
      autoUpdate: 'ON',
      lastUpdated: 'Apr 18, 2025 10:42',
    },
    {
      code: 'CAD',
      name: 'Canadian Dollar',
      symbol: 'C$',
      value: '₹61.20',
      autoUpdate: 'ON',
      lastUpdated: 'Apr 18, 2025 10:42',
    },
    {
      code: 'AUD',
      name: 'Australian Dollar',
      symbol: 'A$',
      value: '₹55.35',
      autoUpdate: 'ON',
      lastUpdated: 'Apr 18, 2025 10:42',
    },
    {
      code: 'CHF',
      name: 'Swiss Franc',
      symbol: 'CHF',
      value: '₹92.14',
      autoUpdate: 'ON',
      lastUpdated: 'Apr 18, 2025 10:42',
    },
    {
      code: 'CNY',
      name: 'Chinese Yuan',
      symbol: '¥',
      value: '₹11.46',
      autoUpdate: 'ON',
      lastUpdated: 'Apr 18, 2025 10:42',
    },
  ];

  const currencyColumns = [
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
    { accessorKey: 'lastUpdated', header: 'Last Updated' },
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
          data={currencyData}
          showPagination={true}
          showToolbar={false}
        />
      </CardContent>
    </Card>
  );
}
