export interface ExportColumn {
  id: string;
  header: string;
}

export async function exportDataToExcel({
  columns,
  rows,
  filenamePrefix = 'table_export',
}: {
  columns: ExportColumn[];
  rows: Record<string, unknown>[];
  filenamePrefix?: string;
}) {
  const { utils, writeFile } = await import('xlsx');
  if (!rows.length) {
    throw new Error('No data available for export.');
  }

  // Prepare data for Excel export
  const exportData = rows.map((row) => {
    const rowData: Record<string, unknown> = {};
    for (const col of columns) {
      rowData[col.header] = row[col.id];
    }
    return rowData;
  });

  // Create worksheet and workbook
  const ws = utils.json_to_sheet(exportData);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Data');

  // Generate filename with current date
  const currentDate = new Date().toISOString().split('T')[0];
  const filename = `${filenamePrefix}_${currentDate}.xlsx`;

  // Save file
  writeFile(wb, filename);
}
