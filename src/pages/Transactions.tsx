import {
  EllipsisVerticalIcon,
  InfoIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react';
import {
  useGetAllTransactionsQuery,
  useGetTransactionsDashboardQuery,
} from '@/api/queries';
import { DataTable } from '@/components/DataTable';
import { PageLayout } from '@/components/PageLayout';
import {
  transactionColumns,
  transactionFilters,
} from '@/components/transactions/TransactionColumns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
// import { transactionsData } from '@/data/transactions';

export default function Transactions() {
  const { data, isLoading } = useGetAllTransactionsQuery();
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGetTransactionsDashboardQuery();

  const metricsData = [
    {
      label: 'Total Active Transaction',
      value: dashboardData?.totalActiveTransaction.toLocaleString() || '0',
      hasTooltip: true,
    },
    {
      label: 'Monthly Spending',
      value: dashboardData?.monthlySpending.toLocaleString() || '0',
      hasTooltip: true,
    },
    {
      label: 'Avg Transaction Time',
      value: dashboardData?.avgTransactionTime.toLocaleString() || '0',
      hasTooltip: true,
    },
    {
      label: 'Top Sending Country',
      value: dashboardData?.topSendingCountry || 'Unknown',
    },
    {
      label: 'Top Receiving Country',
      value: dashboardData?.topReceivingCountry || 'Unknown',
    },
  ];
  return (
    <PageLayout
      className="space-y-6"
      description="Manage and track all your financial transactions"
      title="Transactions"
    >
      {/* Metrics Header */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {isDashboardLoading
              ? [
                  'total-active',
                  'monthly-spending',
                  'avg-time',
                  'top-sending',
                  'top-receiving',
                ].map((skeletonKey, idx) => (
                  <div
                    className={`b space-y-2${idx !== 4 ? ' border-r' : ''}`}
                    key={skeletonKey}
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))
              : metricsData.map((metric, idx) => (
                  <div
                    className={`b space-y-2${idx !== metricsData.length - 1 ? ' border-r' : ''}`}
                    key={metric.label}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">
                        {metric.label}
                      </span>
                      {metric.hasTooltip && (
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="font-semibold text-2xl">{metric.value}</div>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>

      {/* Currency Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isDashboardLoading
          ? ['currency-1', 'currency-2', 'currency-3', 'currency-4'].map(
              (skeletonKey) => (
                <Card key={skeletonKey}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-24" />
                      <div className="flex items-center gap-2 text-sm">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )
          : dashboardData?.currencyStats.map((currency) => {
              const isNegative = currency.comparedToLastMonthPercent < 0;
              return (
                <Card key={currency.currency}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-medium text-muted-foreground text-sm">
                        {currency.currency}
                      </CardTitle>
                      <Button
                        aria-label="Currency options"
                        size="icon"
                        variant="ghost"
                      >
                        <EllipsisVerticalIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="font-bold text-2xl">
                        {currency.amount.toFixed(2)}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div
                          className={`flex items-center gap-1 ${isNegative ? 'text-red-600' : 'text-green-600'}`}
                        >
                          {isNegative ? (
                            <TrendingDownIcon className="h-4 w-4" />
                          ) : (
                            <TrendingUpIcon className="h-4 w-4" />
                          )}
                          <span>
                            {isNegative ? '-' : '+'}
                            {Math.abs(currency.comparedToLastMonthPercent)}%
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          Since Last Month
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* Recent Transactions Table */}
      <DataTable
        columns={transactionColumns}
        data={data?.docs}
        filters={transactionFilters}
        isLoading={isLoading}
        showPagination={true}
        showToolbar={true}
        title="Recent Transactions"
      />
    </PageLayout>
  );
}
