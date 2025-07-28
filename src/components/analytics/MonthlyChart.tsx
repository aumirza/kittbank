import { Cell, Pie, PieChart, Sector, Tooltip } from 'recharts';
import { useGetMonthlyTransactionPieChartQuery } from '@/api/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { type ChartConfig, ChartContainer } from '../ui/chart';

export function MonthlyChart() {
  const { data: dynamicData = [], isLoading } =
    useGetMonthlyTransactionPieChartQuery();
  const SORT_OPTIONS = ['Date', 'Amount'];

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

  // Generate currencies from dynamic data
  const CURRENCIES = dynamicData.map((item) => ({
    name: chartConfig[item.currency]?.label ?? item.currency,
    code: item.currency,
  }));

  const COLORS = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FFCD56',
  ];

  const totalValue = dynamicData.reduce((sum, item) => sum + item.count, 0);
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
        {isLoading ? (
          <>
            <div className="flex w-1/2 flex-col items-center justify-center">
              <Skeleton className="size-40 rounded-full" />
            </div>
            <ul className="w-1/2 list-disc space-y-3 pl-3">
              {[
                'pie-skeleton-1',
                'pie-skeleton-2',
                'pie-skeleton-3',
                'pie-skeleton-4',
              ].map((key) => (
                <li className="flex items-center gap-2" key={key}>
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="w-1/2">
              <ChartContainer className="h-56 w-full" config={chartConfig}>
                <PieChart>
                  <Pie
                    activeIndex={0}
                    activeShape={({ outerRadius = 0, ...props }) => (
                      <Sector
                        {...props}
                        outerRadius={(outerRadius || 0) + 10}
                      />
                    )}
                    cx="50%"
                    cy="50%"
                    data={dynamicData}
                    dataKey="count"
                    label={({ currency, percent }) =>
                      `${currency} (${(percent * 100).toFixed(0)}%)`
                    }
                    nameKey="currency"
                    outerRadius={dynamicOuterRadius}
                  >
                    {dynamicData.map((entry, index) => (
                      <Cell
                        fill={COLORS[index % COLORS.length]}
                        key={entry.currency}
                      />
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
