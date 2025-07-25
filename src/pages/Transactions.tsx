import { InfoIcon, TrendingUpIcon } from 'lucide-react';
import { useGetAllTransactionsQuery } from '@/api/queries';
import { DataTable } from '@/components/DataTable';
import { PageLayout } from '@/components/PageLayout';
import { transactionColumns } from '@/components/transactions/TransactionColumns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// import { transactionsData } from '@/data/transactions';

const metricsData = [
  {
    label: 'Total Active Transaction',
    value: '4,890',
    hasTooltip: true,
  },
  {
    label: 'Monthly Spending',
    value: '$3,220.50',
    hasTooltip: true,
  },
  {
    label: 'Avg Transaction Time',
    value: '2.8sec',
    hasTooltip: true,
  },
  {
    label: 'Top Sending Country',
    value: 'India',
  },
  {
    label: 'Top Receiving Country',
    value: 'Dubai',
  },
];

const currencyData = [
  {
    currency: 'USD',
    amount: '$85,234.00',
    change: '+2.4%',
    period: 'Since Last Month',
  },
  {
    currency: 'EUR',
    amount: '€ 85,234.00',
    change: '+2.4%',
    period: 'Since Last Month',
  },
  {
    currency: 'GBP',
    amount: '£ 85,234.00',
    change: '+2.4%',
    period: 'Since Last Month',
  },
  {
    currency: 'JPY',
    amount: '¥ 85,234.00',
    change: '+2.4%',
    period: 'Since Last Month',
  },
];

export default function Transactions() {
  const { data } = useGetAllTransactionsQuery();
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
            {metricsData.map((metric) => (
              <div className="space-y-2" key={metric.label}>
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
        {currencyData.map((currency) => (
          <Card key={currency.currency}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-medium text-muted-foreground text-sm">
                  {currency.currency}
                </CardTitle>
                <button
                  aria-label="Currency options"
                  className="text-muted-foreground hover:text-foreground"
                  type="button"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>More options</title>
                    <path
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="font-bold text-2xl">{currency.amount}</div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUpIcon className="h-4 w-4" />
                    <span>{currency.change}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {currency.period}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions Table */}
      {data?.docs && data?.docs?.length > 0 ? (
        <DataTable
          columns={transactionColumns}
          data={data.docs}
          showPagination={true}
          showToolbar={true}
          title="Recent Transactions"
        />
      ) : (
        <div className="text-center text-muted-foreground">
          No recent transactions found.
        </div>
      )}
    </PageLayout>
  );
}
