// Utility filter functions for table columns
// Extracted from TransactionColumns.tsx and UserColumns.tsx

import { inRelativeRange } from '@/lib/date';

/**
 * Filter function for numeric range (e.g., amount, totalTransaction)
 * Supports string values in the form "min-max" or "min-" and direct number values.
 */
export function filterByNumberRange(
  row: { getValue: (id: string) => unknown },
  id: string,
  value: string | number
): boolean {
  const num = Number.parseFloat(String(row.getValue(id)));
  if (Number.isNaN(num)) {
    return false;
  }
  if (typeof value === 'string') {
    const [minStr, maxStr] = value.split('-');
    const min = Number(minStr);
    const max =
      maxStr === '' || maxStr === undefined ? undefined : Number(maxStr);
    if (Number.isNaN(min)) {
      return false;
    }
    if (max !== undefined && Number.isNaN(max)) {
      return false;
    }
    return num >= min && (max === undefined || num <= max);
  }
  if (typeof value === 'number') {
    return num >= value;
  }
  return false;
}

/**
 * Filter function for date ranges (today, yesterday, week, month)
 * Uses the inRelativeRange utility from @/lib/date
 */
// If you want to use a shared date filter, pass inRelativeRange as an argument
export function filterByRelativeDate(
  row: { getValue: (id: string) => unknown },
  columnId: string,
  filterValue: string
): boolean {
  if (!filterValue) {
    return true;
  }
  const raw = row.getValue(columnId);
  if (
    filterValue === 'today' ||
    filterValue === 'yesterday' ||
    filterValue === 'week' ||
    filterValue === 'month'
  ) {
    return inRelativeRange(raw, filterValue, { weekStartsOn: 1 });
  }
  return true;
}
