export interface FilterConfig<T> {
  label: string;
  type: 'select' | 'range';
  columnKey: keyof T;
  options: { value: string; label: string }[];
}
