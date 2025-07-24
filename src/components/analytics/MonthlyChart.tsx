import { Cell, Pie, PieChart, Sector, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type ChartConfig, ChartContainer } from '../ui/chart';

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

  const chartConfig: ChartConfig = {
    USD: {
      color: '#FF6384',
      label: 'US Dollar',
    },
    EUR: {
      color: '#36A2EB',
      label: 'Euro',
    },
    GBP: {
      color: '#FFCE56',
      label: 'British Pound',
    },
    JPY: {
      color: '#4BC0C0',
      label: 'Japanese Yen',
    },
    CNY: {
      color: '#9966FF',
      label: 'Chinese Yuan',
    },
    SEK: {
      color: '#FF9F40',
      label: 'Swedish Krona',
    },
    ESP: {
      color: '#FFCD56',
      label: 'Spanish Pesetas',
    },
  };

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const dynamicOuterRadius = Math.min(100, totalValue * 5);

  return (
    <Card className="p-4">
      <CardHeader className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-4">
          <CardTitle>Monthly</CardTitle>
          <Select>
            <SelectTrigger className="w-32 rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex gap-8">
        <div className="w-1/2">
          <ChartContainer className="h-full w-full" config={chartConfig}>
            <PieChart>
              <Pie
                activeIndex={0}
                activeShape={({ outerRadius = 0, ...props }) => (
                  <Sector {...props} outerRadius={(outerRadius || 0) + 10} />
                )}
                cx="50%"
                cy="50%"
                data={data}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                nameKey="name"
                outerRadius={dynamicOuterRadius}
              >
                {data.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} key={entry.name} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>
        </div>
        <ul className="list-disc space-y-3 pl-3">
          {CURRENCIES.map((currency, index) => (
            <li className="flex items-center gap-2" key={currency.code}>
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {currency.name} ({currency.code})
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
