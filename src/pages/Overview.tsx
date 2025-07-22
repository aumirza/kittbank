import FinancialSnapshot from '@/components/overview/FinancialSnapshot';
import { MonthlySpendingTrend } from '@/components/overview/MonthlySpendingTrend';
import { RecentTransactions } from '@/components/overview/RecentTransactions';
import { TicketsCard } from '@/components/overview/TicketsCard';
import { TransactionsCard } from '@/components/overview/TransactionsCard';

export default function Overview() {
  return (
    <div className="space-y-6">
      {/*  */}
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
    </div>
  );
}
