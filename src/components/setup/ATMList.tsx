import type { ColumnDef } from '@tanstack/react-table';
import { PlusIcon, UploadIcon } from 'lucide-react';
import { useGetAllAtmsQuery } from '@/api/queries';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import type { IATM } from '@/types/atm';
import { Button } from '../ui/button';
import { AddATMDialog } from './AddATMDialog';
import { ListMapSwitcher } from './ListMapSwitcher';

const atmColumns: (ColumnDef<IATM> & {
  label: string;
  isSearchable?: boolean;
})[] = [
  {
    label: 'ATM ID',
    accessorKey: '_id',
    header: 'ATM ID',
  },
  {
    label: 'Name',
    accessorKey: 'name',
    header: 'Name',
    isSearchable: true,
  },
  {
    label: 'Location',
    accessorKey: 'locationInWord',
    header: 'Location',
  },
  {
    label: 'Address',
    accessorKey: 'company',
    header: 'Company',
  },
  {
    label: 'Machine Type',
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
        <DataTable
          columns={atmColumns}
          data={atmData?.docs}
          isLoading={isLoading}
          showGlobalFilter
          showPagination={true}
          showToolbar
          toolbarActions={
            <>
              {/* Upload Button */}
              <Button className="h-12 rounded-full" size="sm" variant="outline">
                <UploadIcon className="mr-2 h-4 w-4" />
                Bulk Upload
              </Button>
              {/* Add Button */}
              <AddATMDialog>
                <Button
                  className="h-12 rounded-full"
                  size="sm"
                  variant="outline"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </AddATMDialog>
            </>
          }
        />
      </CardContent>
    </Card>
  );
}
