import { InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FinancialSnapshot() {
  const totalBalance = 525_380.0;
  const monthlySpending = 3220.5;
  const monthlyIncome = 5200.0;
  const upcomingPayments = 8;
  const savingsRate = 28;

  const metrics = [
    {
      title: 'Total Balance',
      value: `$${totalBalance.toLocaleString()}`,
    },
    {
      title: 'Monthly Spending',
      value: `$${monthlySpending.toLocaleString()}`,
    },
    {
      title: 'Income This Month',
      value: `$${monthlyIncome.toLocaleString()}`,
    },
    {
      title: 'Upcoming Payments',
      value: `${upcomingPayments} Payments`,
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
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
                <div className={'font-bold text-2xl'}>{metric.value}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
