import {
  FunnelIcon,
  PlusIcon,
  SearchIcon,
  StickyNoteIcon,
  UploadIcon,
} from 'lucide-react';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ListMapSwitcher } from './ListMapSwitcher';

export function ATMList() {
  const atmData = {
    atmId: 'ATM001',
    name: 'MG Road ATM',
    location: 'MG Road, Bangalore',
    company: 'KittBank',
    type: 'Withdrawal Only',
  };

  const atmColumns = [
    {
      accessorKey: 'atmId',
      header: 'ATM ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
  ];
  return (
    <Card>
      <CardContent>
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="font-semibold text-lg">ATM List</h2>
          <ListMapSwitcher />
        </div>
        <div className="mb-5 flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-5 h-4 w-4 text-muted-foreground" />
            <Input
              className="max-full h-12 rounded-full pl-10"
              placeholder="Search"
            />
          </div>

          <div className="grid flex-1 grid-cols-4 gap-2">
            {/* Export Button */}
            <Button className="h-12 rounded-full" size="sm" variant="outline">
              <FunnelIcon className="mr-2 h-4 w-4" />
              All Filter
            </Button>
            {/* Export Button */}
            <Button className="h-12 rounded-full" size="sm" variant="outline">
              <StickyNoteIcon className="mr-2 h-4 w-4" />
              Export
            </Button>
            {/* Upload Button */}
            <Button className="h-12 rounded-full" size="sm" variant="outline">
              <UploadIcon className="mr-2 h-4 w-4" />
              Bulk Upload
            </Button>
            {/* Add Button */}
            <Button className="h-12 rounded-full" size="sm" variant="outline">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
        <DataTable
          columns={atmColumns}
          data={new Array(10).fill(atmData)}
          showPagination={true}
          showToolbar={false}
        />
      </CardContent>
    </Card>
  );
}
