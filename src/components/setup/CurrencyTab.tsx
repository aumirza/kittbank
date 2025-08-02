import type { ColumnDef } from '@tanstack/react-table';
import { formatRelative } from 'date-fns';
import {
  MoreVertical,
  PencilLine,
  PlusIcon,
  Trash2Icon,
  UploadIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useDeleteCurrencyMutation } from '@/api/mutations';
import { useGetAllCurrenciesQuery } from '@/api/queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ICurrency } from '@/types/currency';
import { ConfirmDialog } from '../ConfirmDialog';
import { DataTable } from '../DataTable';
import { AddCurrencyDialog } from './AddCurrencyDialog';

const currencyColumns: (ColumnDef<ICurrency> & {
  label?: string;
  isSearchable?: boolean;
})[] = [
  { accessorKey: 'code', header: 'Code' },
  { label: 'Name', accessorKey: 'name', header: 'Name', isSearchable: true },
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
    cell: ({ row }) => {
      const { mutateAsync } = useDeleteCurrencyMutation();
      const [openConfirm, setOpenConfirm] = useState(false);
      const [openAddCurrency, setOpenAddCurrency] = useState(false);

      const handleDelete = async () => {
        try {
          await mutateAsync(row.original._id);
          setOpenConfirm(false);
          toast.success('Currency deleted successfully');
        } catch {
          toast.error('Failed to delete currency');
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="More actions" size="icon" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 rounded-xl border border-gray-200 shadow-lg"
            >
              <DropdownMenuItem
                className="flex items-center gap-3 px-4 py-3 text-base text-gray-800 hover:bg-gray-100 focus:bg-gray-100"
                onClick={() => setOpenAddCurrency(true)}
              >
                <PencilLine className="h-5 w-5 text-[rgb(108,71,255)]" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-3 px-4 py-3 text-base text-red-500 hover:bg-red-50 focus:bg-red-50"
                onClick={() => setOpenConfirm(true)}
              >
                <Trash2Icon className="h-5 w-5 text-[#FF5A5F]" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ConfirmDialog
            onConfirm={handleDelete}
            onOpenChange={setOpenConfirm}
            open={openConfirm}
            title={
              'Are you sure you want to delete this currency? This action cannot be undone.'
            }
          />
          <AddCurrencyDialog
            currency={undefined}
            isEdit={true}
            onOpenChange={setOpenAddCurrency}
            open={openAddCurrency}
          />
        </>
      );
    },
  },
];

export function CurrencyTab() {
  const { data: currencyData, isLoading } = useGetAllCurrenciesQuery();

  return (
    <Card>
      <CardContent>
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="font-semibold text-lg">Currency list</h2>
        </div>
        <DataTable
          columns={currencyColumns}
          data={currencyData?.docs}
          isLoading={isLoading}
          showPagination={true}
          showToolbar
          toolbarActions={
            <>
              <Button className="h-12 rounded-full" size="sm" variant="outline">
                <UploadIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                Bulk Upload
              </Button>
              <AddCurrencyDialog>
                <Button
                  className="h-12 rounded-full"
                  size="sm"
                  variant="outline"
                >
                  <PlusIcon aria-hidden="true" className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </AddCurrencyDialog>
            </>
          }
        />
      </CardContent>
    </Card>
  );
}
