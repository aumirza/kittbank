import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
} from 'date-fns';

export type RelativeDateRange = 'today' | 'yesterday' | 'week' | 'month';

// Safely parse a value into a valid Date or return null
export const toDateSafe = (value: unknown): Date | null => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }
  if (typeof value === 'string') {
    const iso = parseISO(value);
    if (!Number.isNaN(iso.getTime())) {
      return iso;
    }
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) {
      return d;
    }
  }
  return null;
};

export interface RelativeRangeOptions {
  now?: Date;
  // 0 (Sunday) - 6 (Saturday). Default Monday (1)
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export const getRelativeRangeBounds = (
  range: RelativeDateRange,
  options?: RelativeRangeOptions
): { start: Date; end: Date } => {
  const now = options?.now ?? new Date();
  const weekStartsOn = options?.weekStartsOn ?? 1;
  switch (range) {
    case 'today':
      return { start: startOfDay(now), end: endOfDay(now) };
    case 'yesterday': {
      const y = subDays(now, 1);
      return { start: startOfDay(y), end: endOfDay(y) };
    }
    case 'week':
      return {
        start: startOfWeek(now, { weekStartsOn }),
        end: endOfWeek(now, { weekStartsOn }),
      };
    case 'month':
      return { start: startOfMonth(now), end: endOfMonth(now) };
    default: {
      // Exhaustive check
      const _exhaustive: never = range as never;
      throw new Error(`Unsupported range: ${_exhaustive}`);
    }
  }
};

// Check if a date-like input falls within a relative range
export const inRelativeRange = (
  dateInput: unknown,
  range: RelativeDateRange,
  options?: RelativeRangeOptions
): boolean => {
  const date = toDateSafe(dateInput);
  if (!date) {
    return false;
  }
  const { start, end } = getRelativeRangeBounds(range, options);
  return isWithinInterval(date, { start, end });
};
