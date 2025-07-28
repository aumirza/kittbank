import type { ColumnDef } from '@tanstack/react-table';
import {
  FunnelIcon,
  PlusIcon,
  SearchIcon,
  StickyNoteIcon,
  UploadIcon,
} from 'lucide-react';
import { useGetAllAtmsQuery } from '@/api/queries';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import type { IATM } from '@/types/atm';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AddATMDialog } from './AddATMDialog';
import { ListMapSwitcher } from './ListMapSwitcher';

const atmColumns: ColumnDef<IATM>[] = [
  {
    accessorKey: '_id',
    header: 'ATM ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'locationInWord',
    header: 'Location',
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'machine',
    header: 'Type',
  },
];

export function ATMList() {
  const { data: atmData, isLoading } = useGetAllAtmsQuery();

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
            <AddATMDialog>
              <Button className="h-12 rounded-full" size="sm" variant="outline">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add
              </Button>
            </AddATMDialog>
          </div>
        </div>
        <DataTable
          columns={atmColumns}
          data={atmData?.docs}
          isLoading={isLoading}
          showPagination={true}
          showToolbar={false}
        />
      </CardContent>
    </Card>
  );
}
