import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetMonthlySpendingTrendQuery } from '@/api/queries';
import { Card } from '../ui/card';
import { type ChartConfig, ChartContainer } from '../ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const chartConfig: ChartConfig = {
  amount: {
    label: 'Amount',
    color: '#8884d8',
  },
};

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);

export function MonthlySpendingTrend() {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { data, isLoading } = useGetMonthlySpendingTrendQuery(selectedYear);

  const yTicks = useMemo(() => {
    if (!data || data.length === 0) {
      return [0];
    }
    const max = Math.max(...data.map((d) => d.amount)) * 1.1;
    const step = Math.ceil(max / 4 / 50) * 50; // round to nearest 50 for nicer ticks
    return Array.from({ length: 5 }, (_, i) => i * step);
  }, [data]);
  // Memoize maxAmount calculation for performance
  const maxAmount = useMemo(() => {
    if (!data || data.length === 0) {
      return 0;
    }
    return Math.max(...data.map((d) => d.amount)) * 1.1;
  }, [data]);

  return (
    <Card className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium text-base text-black">
          Monthly Spending Trend
        </h2>
        <Select
          onValueChange={(val) => setSelectedYear(Number(val))}
          value={String(selectedYear)}
        >
          <SelectTrigger
            aria-label="Select year"
            className="flex min-w-[80px] items-center gap-2 rounded-lg border px-4 py-2 font-normal text-sm"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {YEARS.map((y) => (
              <SelectItem
                className={y === selectedYear ? 'bg-muted font-semibold' : ''}
                key={y}
                value={String(y)}
              >
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="relative h-64 w-full">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full animate-pulse">
              <div className="h-48 w-full rounded bg-gray-200" />
            </div>
          </div>
        ) : data && data?.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            No spending data available for {selectedYear}
          </div>
        ) : (
          <ChartContainer className="h-full w-full" config={chartConfig}>
            <AreaChart data={data}>
              <XAxis axisLine={false} dataKey="month" tickLine={false} />
              {/* Vertical dotted lines for each month end except the last */}
              {data?.slice(0, -1).map((d) => (
                <ReferenceLine
                  ifOverflow="extendDomain"
                  key={`month-end-${d.month}`}
                  stroke="#aaaaaa"
                  strokeDasharray="5 2"
                  x={d.month}
                />
              ))}
              <YAxis
                axisLine={false}
                domain={[0, maxAmount]}
                tickFormatter={(v) => `$${v}`}
                tickLine={true}
                ticks={yTicks}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  fontSize: 14,
                  background: '#fff',
                  border: '1px solid #eee',
                  color: '#222',
                }}
                cursor={{ fill: '#ffe066', fillOpacity: 0.1 }}
                formatter={(value: number) => [`$${value}`, 'Spending']}
              />
              <Area
                activeDot={{ r: 5 }}
                aria-label="Monthly spending area"
                dataKey="amount"
                fill="url(#area-gradient)"
                stroke="#ffe066"
                strokeWidth={2}
                type="stepAfter"
              />
              <defs>
                <linearGradient id="area-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffe066" stopOpacity={1} />
                  <stop offset="60%" stopColor="#ffe066" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#ffe066" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ChartContainer>
        )}
      </div>
    </Card>
  );
}
