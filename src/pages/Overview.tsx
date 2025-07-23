import FinancialSnapshot from '@/components/overview/FinancialSnapshot';
import { MonthlySpendingTrend } from '@/components/overview/MonthlySpendingTrend';
import { RecentTransactions } from '@/components/overview/RecentTransactions';
import { TicketsCard } from '@/components/overview/TicketsCard';
import { TransactionsCard } from '@/components/overview/TransactionsCard';
import { PageLayout } from '@/components/PageLayout';

export default function Overview() {
  return (
    <PageLayout
      className="space-y-6"
      description="Stay on top of your finances, all in one place."
      title="Overview"
    >
      <FinancialSnapshot />

      <div className="grid gap-6 md:grid-cols-4">
        {/* Monthly Spending Trend Chart */}
        <div className="md:col-span-3">
          <MonthlySpendingTrend />
        </div>

        <TicketsCard />
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <TransactionsCard />
        <div className="md:col-span-3">
          {/* Recent Transactions */}
          <RecentTransactions />
        </div>
      </div>
    </PageLayout>
  );
}
