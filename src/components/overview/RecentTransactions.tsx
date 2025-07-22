// ...existing code...
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const recentTransactions = [
  {
    id: 1,
    date: 'Jul 07 2025',
    description: 'GrabFood',
    category: 'Food & Drink',
    amount: -8.2,
    type: 'Expense',
  },
  {
    id: 2,
    date: 'Jul 06 2025',
    description: 'Month Salary',
    category: 'Income',
    amount: 3000,
    type: 'Income',
  },
  {
    id: 3,
    date: 'Jul 05 2025',
    description: 'Game Top up',
    category: 'Entertainment',
    amount: -5.99,
    type: 'Expense',
  },
];

export function RecentTransactions() {
  return (
    <Card className="rounded-xl ">
      <CardHeader className="border-none pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-base text-black">
            Recent Transactions
          </CardTitle>
          <span className="cursor-pointer text-gray-500 hover:underline">
            See Detail
          </span>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-5 gap-4 rounded bg-accent px-6 py-4 font-medium text-gray-500">
            <span>Date</span>
            <span>Description</span>
            <span>Category</span>
            <span className="text-right">Amount</span>
            <span className="text-center">Type</span>
          </div>
          {recentTransactions.map((transaction, idx) => (
            <div
              className={`grid grid-cols-5 items-center gap-4 bg-white px-6 py-3 ${idx !== recentTransactions.length - 1 ? ' border-b' : ''}`}
              key={transaction.id}
            >
              <span className="text-gray-700">{transaction.date}</span>
              <span className="font-medium text-gray-900">
                {transaction.description}
              </span>
              <span className="text-gray-700">{transaction.category}</span>
              <span
                className={`text-right font-medium ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}
              >
                {transaction.type === 'Income'
                  ? `$${Math.abs(transaction.amount).toLocaleString()}`
                  : `($${Math.abs(transaction.amount).toLocaleString()})`}
              </span>
              <span className="text-center">{transaction.type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
