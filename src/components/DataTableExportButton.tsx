import type { Table } from '@tanstack/react-table';
import { DownloadIcon } from 'lucide-react';
import { useExportDataTable } from '../hooks/useExportDataTable';
import { Button } from './ui/button';

export function DataTableExportButton<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const { handleExportToExcel, isExporting } = useExportDataTable(table);

  return (
    <Button
      aria-busy={isExporting}
      className="h-12 rounded-full"
      disabled={isExporting}
      onClick={handleExportToExcel}
      size="sm"
      type="button"
      variant="outline"
    >
      <DownloadIcon className="mr-2 h-4 w-4" />
      {isExporting ? 'Exporting...' : 'Export'}
    </Button>
  );
}
