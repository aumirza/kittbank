import { ChevronDown } from 'lucide-react';
import { Cell, Legend, Pie, PieChart, Sector, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function MonthlyChart() {
  const SORT_OPTIONS = ['Date', 'Amount'];
  const CURRENCIES = [
    { name: 'US Dollar', code: 'USD' },
    { name: 'Euro', code: 'EUR' },
    { name: 'British Pound', code: 'GBP' },
    { name: 'Japanese Yen', code: 'JPY' },
    { name: 'Chinese Yuan', code: 'CNY' },
    { name: 'Swedish Krona', code: 'SEK' },
    { name: 'Spanish Pesetas', code: 'ESP' },
  ];

  const data = [
    { name: 'USD', value: 15.3 },
    { name: 'EUR', value: 14.0 },
    { name: 'GBP', value: 14.0 },
    { name: 'JPY', value: 11.3 },
    { name: 'CNY', value: 9.3 },
    { name: 'SEK', value: 8.0 },
    { name: 'ESP', value: 6.7 },
  ];

  const COLORS = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FFCD56',
  ];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const dynamicOuterRadius = Math.min(100, totalValue * 5);

  return (
    <Card className="p-4">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Monthly</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Sort by"
                className="flex items-center gap-2 rounded-lg border px-4 py-2 font-normal text-sm"
                type="button"
              >
                Sort by
                <ChevronDown aria-hidden="true" className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex gap-8">
        <div className="w-1/2">
          <PieChart height={300} width={300}>
            <Pie
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: {
                outerRadius?: number;
                props: Record<string, unknown>;
              }) => <Sector {...props} outerRadius={(outerRadius || 0) + 10} />}
              cx="50%"
              cy="50%"
              data={data}
              dataKey="value"
              fill="#8884d8"
              nameKey="name"
              outerRadius={dynamicOuterRadius}
              strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} key={entry.name} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <ul className="list-disc space-y-3 pl-3">
          {CURRENCIES.map((currency) => (
            <li key={currency.code}>
              {currency.name} ({currency.code})
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
