import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Cell, Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const summary = {
  month: 30_000,
  year: 10_000,
  total: 20_000,
  percent: 75, // percent for the arc
};

const pieData = [
  { name: 'Completed', value: summary.percent },
  { name: 'Remaining', value: 100 - summary.percent },
];

const COLORS = ['var(--color-primary)', '#f3f3f3'];

const chartConfig: ChartConfig = {
  total: {
    label: 'Total',
    color: '#ffe066',
  },
  month: {
    label: 'Month',
    color: '#ffe066',
  },
  year: {
    label: 'Year',
    color: '#ffe066',
  },
};

export function TransactionsCard() {
  const [selectedMonth, setSelectedMonth] = useState('March');

  return (
    <Card className="w-full rounded-2xl shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-semibold text-black text-lg">
          Transaction
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Select month"
              className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 font-medium text-gray-700 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              type="button"
            >
              {selectedMonth}
              <ChevronDown
                aria-hidden="true"
                className="ml-1"
                height={16}
                width={16}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {months.map((month) => (
              <DropdownMenuItem
                aria-selected={selectedMonth === month}
                className="cursor-pointer"
                key={month}
                onSelect={() => setSelectedMonth(month)}
              >
                {month}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-2 pb-6">
        <ChartContainer
          className="relative flex h-40 w-40 items-center justify-center"
          config={chartConfig}
        >
          <PieChart
            aria-label="Total Transaction Progress"
            height={160}
            width={160}
          >
            <Pie
              cornerRadius={8}
              data={pieData}
              dataKey="value"
              innerRadius={70}
              outerRadius={80}
              stroke="none"
            >
              {pieData.map((entry, idx) => (
                <Cell fill={COLORS[idx]} key={entry.name} />
              ))}
            </Pie>
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      dominantBaseline="middle"
                      textAnchor="middle"
                      x={viewBox.cx}
                      y={viewBox.cy}
                    >
                      <tspan
                        fill="#232323"
                        fontSize="22"
                        fontWeight="bold"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        {`$${summary.total.toLocaleString()}`}
                      </tspan>
                      <tspan
                        fill="#6b7280"
                        fontSize="14"
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                      >
                        Total Transaction
                      </tspan>
                    </text>
                  );
                }
              }}
              position="center"
            />
          </PieChart>
        </ChartContainer>
        <div className="mt-10 flex w-full justify-around">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-yellow-400"
              />
              Month
            </span>
            <span className="mt-1 font-semibold text-[#232323] text-sm">
              ${summary.month.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-yellow-100"
              />
              Year
            </span>
            <span className="mt-1 font-semibold text-[#232323] text-sm">
              ${summary.year.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
