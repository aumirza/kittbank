import {
  ArrowUpIcon,
  EllipsisIcon,
  EuroIcon,
  JapaneseYenIcon,
  PoundSterlingIcon,
} from 'lucide-react';
import MonthlyChart from '@/components/analytics/MonthlyChart';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Analytics() {
  return (
    <PageLayout className="space-y-6" title="Analytics">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { currency: 'USD', symbol: '$', value: '85,234.00', change: '+2.4%' },
          { currency: 'EUR', symbol: '€', value: '85,234.00', change: '+2.4%' },
          { currency: 'GBP', symbol: '£', value: '85,234.00', change: '+2.4%' },
          { currency: 'JPY', symbol: '¥', value: '85,234.00', change: '+2.4%' },
        ].map((item) => (
          <Card className="rounded-lg border p-4 shadow-sm" key={item.currency}>
            <CardHeader className="flex items-center justify-between border-gray-700 border-b-3 border-dashed pb-2">
              <CardTitle className="font-medium text-gray-500 text-sm">
                {item.currency}
              </CardTitle>
              <EllipsisIcon className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="font-bold text-3xl text-gray-900">
                {item.symbol}
                {item.value}
              </div>
              <div className="flex items-center text-green-500">
                <ArrowUpIcon className="h-5 w-5" />
                <span className="ml-1 font-medium text-sm">
                  {item.change} Since Last Month
                </span>
              </div>
              <div className="h-1 rounded-full bg-green-500" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="">
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { currency: 'Euro (EUR)', icon: EuroIcon, value: 54 },
                {
                  currency: 'Japanese Yen (JPY)',
                  icon: JapaneseYenIcon,
                  value: 54,
                },
                {
                  currency: 'British Pound (GBP)',
                  icon: PoundSterlingIcon,
                  value: 54,
                },
              ].map((item) => (
                <li
                  className="flex items-center justify-between border-b pb-2"
                  key={item.currency}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex size-14 items-center justify-center bg-amber-50">
                      <item.icon className="size-7 text-primary" />
                    </div>

                    <span className="font-medium text-gray-700">
                      {item.currency}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a className="mt-4 block" href="/details">
              See more
            </a>
          </CardContent>
        </Card>

        <MonthlyChart />
      </div>
    </PageLayout>
  );
}
