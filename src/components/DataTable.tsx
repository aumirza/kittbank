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
import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { FilterConfig } from '@/types/filter';
import { DataTablePagination } from './DataTablePagination';
import { DataTableToolbar } from './DataTableToolbar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DataTableProps<TData, TValue> {
  columns: (ColumnDef<TData, TValue> & {
    label: string;
    isSearchable?: boolean;
  })[];
  data?: TData[];
  isLoading?: boolean;
  searchableColumns?: {
    id: string;
    title: string;
  }[];
  filters?: FilterConfig<TData>[];
  showToolbar?: boolean;
  showPagination?: boolean;
  showGlobalFilter?: boolean;
  title?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  showToolbar = false,
  showPagination = true,
  showGlobalFilter = true,
  title,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data ?? [],
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
  const isTableEmpty = !data || data.length === 0;
  const isNoResults = !isTableEmpty && table.getRowModel().rows.length === 0;

  let tableBodyContent: React.ReactNode;
  if (isLoading) {
    tableBodyContent = Array.from({ length: 5 }).map((_, rowIdx) => {
      // Alternate row background: even = light, odd = dark
      const rowBg = rowIdx % 2 !== 0 ? 'bg-muted' : 'bg-accent/20';
      return (
        <TableRow
          className={`h-12 py-2 ${rowBg}`}
          key={`skeleton-row-${rowBg}-${Math.random().toString(36).slice(2)}`}
        >
          {columns.map((column, colIdx) => (
            <TableCell
              className="h-12 px-5 py-2"
              key={`skeleton-cell-${typeof column.id === 'string' ? column.id : colIdx}`}
            >
              <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-accent/50" />
            </TableCell>
          ))}
        </TableRow>
      );
    });
  } else if (isTableEmpty) {
    tableBodyContent = (
      <TableRow>
        <TableCell className="h-24 text-center" colSpan={columns.length}>
          No data available.
        </TableCell>
      </TableRow>
    );
  } else if (isNoResults) {
    tableBodyContent = (
      <TableRow>
        <TableCell className="h-24 text-center" colSpan={columns.length}>
          No results found.
        </TableCell>
      </TableRow>
    );
  } else {
    tableBodyContent = table.getRowModel().rows.map((row) => (
      <TableRow className="h-12 py-2" key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell className="h-12 px-5 py-2" key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  const searchableColumns = useMemo(
    () => columns.filter((col) => col.isSearchable),
    [columns]
  );

  return (
    <div className="space-y-4">
      {showToolbar && (
        <Card>
          <CardContent>
            <DataTableToolbar
              filters={filters}
              searchableColumns={searchableColumns.map((col) => ({
                id:
                  'accessorKey' in col
                    ? col.accessorKey.toString() || ''
                    : col.id || '',
                title: col.label,
              }))}
              showGlobalFilter={showGlobalFilter}
              table={table}
            />
          </CardContent>
        </Card>
      )}
      <Card>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
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
              <TableBody>{tableBodyContent}</TableBody>
            </Table>
          </div>
          {showPagination &&
            pageCount > 1 &&
            !isLoading &&
            !isTableEmpty &&
            !isNoResults && <DataTablePagination table={table} />}
        </CardContent>
      </Card>
    </div>
  );
}
