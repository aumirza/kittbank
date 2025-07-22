import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { type ChartConfig, ChartContainer } from '../ui/chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const YEARS = [2024, 2025];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Example data for each year
const SPENDING_DATA: Record<number, number[]> = {
  2024: [700, 650, 750, 900, 1000, 950, 900, 950, 900, 750, 800, 850],
  2025: [800, 700, 800, 950, 1050, 1000, 950, 1000, 950, 800, 850, 900],
};

const MAX_Y = 1000;
const Y_TICKS = [1000, 750, 500, 250];

const chartConfig: ChartConfig = {
  amount: {
    label: 'Amount',
    color: '#8884d8',
  },
};

export function MonthlySpendingTrend() {
  const [year, setYear] = useState(YEARS[0]);
  const data = SPENDING_DATA[year].map((amount, i) => ({
    month: MONTHS[i],
    amount,
  }));

  return (
    <Card className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium text-base text-black">
          Monthly Spending Trend
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Select year"
              className="flex min-w-[80px] items-center gap-2 rounded-lg border px-4 py-2 font-normal text-sm"
              variant="outline"
            >
              {year}
              <ChevronDown aria-hidden="true" className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {YEARS.map((y) => (
              <DropdownMenuItem
                aria-selected={y === year}
                className={y === year ? 'bg-muted font-semibold' : ''}
                key={y}
                onSelect={() => setYear(y)}
              >
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative w-full">
        <ChartContainer className="h-64 w-full" config={chartConfig}>
          <AreaChart data={data}>
            <XAxis axisLine={false} dataKey="month" tickLine={false} />
            {/* Vertical dotted lines for each month end except the last */}
            {data.slice(0, -1).map((d) => (
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
              domain={[0, MAX_Y]}
              tickFormatter={(v) => `$${v}`}
              tickLine={true}
              ticks={Y_TICKS}
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
      </div>
    </Card>
  );
}
