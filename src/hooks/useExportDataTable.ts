import type { Table } from '@tanstack/react-table';
import { useState } from 'react';

export function useExportDataTable<TData>(table: Table<TData>) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const columns = table.getAllLeafColumns().map((col) => ({
        id: col.id,
        header:
          typeof col.columnDef.header === 'string'
            ? col.columnDef.header
            : col.id,
      }));
      const rows = table.getRowModel().rows.map((row) => {
        const rowData: Record<string, unknown> = {};
        for (const col of columns) {
          rowData[col.id] = row.getValue(col.id);
        }
        return rowData;
      });
      const { exportDataToExcel } = await import('../lib/exportDataToExcel');
      await exportDataToExcel({ columns, rows });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to export data.');
    } finally {
      setIsExporting(false);
    }
  };

  return { handleExportToExcel, isExporting };
}
