'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './DataTablePagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumns?: {
    id: string;
    title: string;
  }[];
  showToolbar?: boolean;
  showPagination?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  //   searchableColumns,
  //   showToolbar,
  showPagination = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const pageCount = table.getPageCount();
  return (
    <div className="space-y-4">
      {/* {showToolbar && (
        <DataTableToolbar table={table} searchableColumns={searchableColumns} />
      )} */}
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="h-12 bg-accent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="px-5 first:rounded-l-lg last:rounded-r-lg"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="h-12 py-2" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="h-12 px-5 py-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && pageCount > 1 && <DataTablePagination table={table} />}
    </div>
  );
}
