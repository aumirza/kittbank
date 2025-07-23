import type { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className="font-medium text-sm">{title}</div>;
  }

  const getIcon = (col: Column<TData, TValue>) => {
    switch (col.getIsSorted()) {
      case 'asc':
        return <ArrowUpIcon className="ml-2 h-4 w-4" />;
      case 'desc':
        return <ArrowDownIcon className="ml-2 h-4 w-4" />;
      default:
        return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
  };

  return (
    <Button
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      size="sm"
      variant="ghost"
    >
      <span className="font-medium text-sm">{title}</span>
      {getIcon(column)}
    </Button>
  );
}
