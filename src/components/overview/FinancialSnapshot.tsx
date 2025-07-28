import { InfoIcon } from 'lucide-react';
import { useGetFinancialSnapshotQuery } from '@/api/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FinancialSnapshot() {
  const { data } = useGetFinancialSnapshotQuery();

  const metrics = [
    {
      title: 'Total Balance',
      value: data?.totalBalance
        ? `$${data.totalBalance.toLocaleString()}`
        : '$0',
    },
    {
      title: 'Monthly Spending',
      value: data?.monthlySpending
        ? `$${data.monthlySpending.toLocaleString()}`
        : '$0',
    },
    {
      title: 'Income This Month',
      value: data?.incomeThisMonth
        ? `$${data.incomeThisMonth.toLocaleString()}`
        : '$0',
    },
    {
      title: 'Upcoming Payments',
      value: `${data?.upcomingPayments} Payments`,
    },
    {
      title: 'Savings Rate',
      value: `${data?.savingsRate}`,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900 text-lg">
          Your Financial Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric, index) => {
            const isLast = index === metrics.length - 1;
            return (
              <div
                className={`space-y-2${isLast ? '' : ' lg:border-r lg:pr-6'}`}
                key={metric.title}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600 text-sm">
                    {metric.title}
                  </span>
                  <InfoIcon className="h-4 w-4" />
                </div>
                <div className={'font-bold text-xl'}>{metric.value}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
