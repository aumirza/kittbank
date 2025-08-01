import type { Table } from '@tanstack/react-table';
import { FilterIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import { useState } from 'react';
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
import type { FilterConfig } from '@/types/filter';
import { DataTableExportButton } from './DataTableExportButton';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  showGlobalFilter?: boolean;
  filters?: FilterConfig<TData>[];
  searchableColumns?: {
    id: string;
    title: string;
  }[];
  toolbarActions?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  filters,
  showGlobalFilter = true,
  searchableColumns = [],
  toolbarActions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Multi-column search: all columns selected by default
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    searchableColumns.map((col) => col.id)
  );

  // Handle search input change for all selected columns (use for...of)
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    for (const colId of selectedColumns) {
      table.getColumn(colId)?.setFilterValue(value);
    }
  };

  // Handle column selection toggle
  const handleColumnToggle = (colId: string) => {
    setSelectedColumns((prev) =>
      prev.includes(colId)
        ? prev.filter((id) => id !== colId)
        : [...prev, colId]
    );
  };

  return (
    <div className="flex items-center gap-2 ">
      {/* Multi-column Search: Input applies to all selected columns */}
      {searchableColumns.length > 0 && (
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex flex-1 items-center gap-2">
            <SearchIcon
              aria-hidden="true"
              className="-translate-y-1/2 absolute top-1/2 left-5 h-4 w-4 text-muted-foreground"
              focusable="false"
            />
            <Input
              aria-label={`Search ${selectedColumns
                .map((id) => searchableColumns.find((c) => c.id === id)?.title)
                .filter(Boolean)
                .join(', ')}`}
              className="max-full h-12 rounded-full pr-12 pl-10"
              disabled={selectedColumns.length === 0}
              onChange={handleSearchChange}
              placeholder={`Search ${selectedColumns
                .map((id) => searchableColumns.find((c) => c.id === id)?.title)
                .filter(Boolean)
                .join(', ')}`}
              type="search"
              value={
                // Show value from the first selected column, or empty string
                (table
                  .getColumn(selectedColumns.at(0) ?? '')
                  ?.getFilterValue() as string) ?? ''
              }
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Select search columns"
                  className="absolute right-2 flex items-center justify-center rounded-full"
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <SettingsIcon aria-hidden="true" className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Select columns to search</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {searchableColumns.map((col) => (
                  <DropdownMenuCheckboxItem
                    checked={selectedColumns.includes(col.id)}
                    key={col.id}
                    onCheckedChange={() => handleColumnToggle(col.id)}
                  >
                    {col.title}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      <div className="grid flex-1 grid-cols-4 gap-2">
        {/* All Filter Button */}
        {showGlobalFilter && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="h-12 w-full rounded-full"
                size="sm"
                variant="outline"
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                All Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="">
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filters?.length ? (
                filters?.map((filter) => (
                  <DropdownMenuCheckboxItem
                    checked={
                      !table
                        .getColumn(filter.columnKey.toString())
                        ?.getFilterValue()
                    }
                    key={filter.columnKey.toString()}
                    onCheckedChange={() =>
                      table
                        .getColumn(filter.columnKey.toString())
                        ?.setFilterValue('')
                    }
                  >
                    All {filter.label}
                  </DropdownMenuCheckboxItem>
                ))
              ) : (
                <DropdownMenuCheckboxItem
                  checked={table.getColumn('all')?.getFilterValue() === ''}
                  onCheckedChange={() =>
                    table.getColumn('all')?.setFilterValue('')
                  }
                >
                  All Filters
                </DropdownMenuCheckboxItem>
              )}
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
        )}

        {filters?.map((filter) => (
          <div className="md:col-span-1" key={filter.columnKey.toString()}>
            <Select
              onValueChange={(value) =>
                table
                  .getColumn(filter.columnKey.toString())
                  ?.setFilterValue(value === 'all' ? '' : value)
              }
              value={
                (table
                  .getColumn(filter.columnKey.toString())
                  ?.getFilterValue() as string) ?? 'all'
              }
            >
              <SelectTrigger className="h-12! w-full rounded-full">
                <SelectValue placeholder={filter.label || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {filter.label || 'Select an option'}
                </SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        {/* Export Button */}
        <DataTableExportButton table={table} />

        {/* Custom Toolbar Actions */}
        {toolbarActions && toolbarActions}
      </div>
    </div>
  );
}
