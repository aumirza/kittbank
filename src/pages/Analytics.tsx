import { ArrowDownIcon, ArrowUpIcon, EllipsisIcon } from 'lucide-react';
import { Link } from 'react-router';
import {
  useGetCurrencySummaryQuery,
  useGetMonthlyCurrencySummaryQuery,
} from '@/api/queries';
import { MonthlyChart } from '@/components/analytics/MonthlyChart';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'JPY':
      return '¥';
    default:
      return '';
  }
};

export default function Analytics() {
  const { data, isLoading: isSummaryLoading } = useGetCurrencySummaryQuery();
  const { data: monthlyData, isLoading: isMonthlyLoading } =
    useGetMonthlyCurrencySummaryQuery();

  const formattedData = Object.entries(data || {})
    .map(([currency, values]) => {
      const isNegative = values.percentChange < 0;
      return {
        currency,
        symbol: getCurrencySymbol(currency),
        value: values.amount.toLocaleString(),
        change: `${Math.abs(values.percentChange).toFixed(2)}%`,
        isNegative,
      };
    })
    .sort((a, b) => {
      return a.currency.localeCompare(b.currency);
    });

  const monthlyFormattedData = Object.entries(monthlyData || {}).map(
    ([_key, val]) => ({
      currency: val.currency,
      symbol: getCurrencySymbol(val.currency),
      value: val.count.toLocaleString(),
    })
  );

  return (
    <PageLayout className="space-y-6" title="Analytics">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {isSummaryLoading
          ? [
              'summary-skeleton-1',
              'summary-skeleton-2',
              'summary-skeleton-3',
              'summary-skeleton-4',
            ].map((key) => (
              <Card className="rounded-lg border p-4 shadow-sm" key={key}>
                <CardHeader className="flex items-center justify-between border-gray-700 border-b-3 border-dashed pb-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-8 w-24" />
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-1 w-full rounded-full" />
                </CardContent>
              </Card>
            ))
          : formattedData.map((item) => (
              <Card
                className="rounded-lg border p-4 shadow-sm"
                key={item.currency}
              >
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
                  <div
                    className={`flex items-center ${item.isNegative ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {item.isNegative ? (
                      <ArrowDownIcon className="h-5 w-5" />
                    ) : (
                      <ArrowUpIcon className="h-5 w-5" />
                    )}
                    <span className="ml-1 font-medium text-sm">
                      {item.isNegative ? '-' : '+'}
                      {item.change} Since Last Month
                    </span>
                  </div>
                  <div
                    className={`h-1 rounded-full ${item.isNegative ? 'bg-red-500' : 'bg-green-500'}`}
                  />
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            {isMonthlyLoading ? (
              <ul className="space-y-4">
                {[
                  'monthly-skeleton-1',
                  'monthly-skeleton-2',
                  'monthly-skeleton-3',
                  'monthly-skeleton-4',
                ].map((key) => (
                  <li
                    className="flex items-center justify-between border-b pb-2"
                    key={key}
                  >
                    <div className="flex items-center space-x-4">
                      <Skeleton className="size-14" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-6 w-10" />
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="space-y-4">
                  {monthlyFormattedData.map((item) => (
                    <li
                      className="flex items-center justify-between border-b pb-2"
                      key={item.currency}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex size-14 items-center justify-center bg-amber-50">
                          <span className="font-semibold text-3xl text-primary">
                            {item.symbol}
                          </span>
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
                <Link className="mt-4 block" to="/#">
                  See more
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        <MonthlyChart />
      </div>
    </PageLayout>
  );
}
