import { useGetRecentTransactionsQuery } from '@/api/queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentTransactions() {
  const { data, isLoading, isError } = useGetRecentTransactionsQuery(5);

  // The API returns { transactions: IRecentTransaction[] } inside data?.items
  const recentTransactions = data?.transactions ?? [];

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
          {isLoading && (
            <div className="py-6 text-center text-gray-500">Loading...</div>
          )}
          {isError && (
            <div className="py-6 text-center text-red-500">
              Failed to load transactions.
            </div>
          )}
          {!(isLoading || isError) && recentTransactions.length === 0 && (
            <div className="py-6 text-center text-gray-500">
              No recent transactions found.
            </div>
          )}
          {!(isLoading || isError) &&
            recentTransactions.map((transaction, idx) => (
              <div
                className={`grid grid-cols-5 items-center gap-4 bg-white px-6 py-3 ${idx !== recentTransactions.length - 1 ? ' border-b' : ''}`}
                key={transaction.date}
              >
                <span className="text-gray-700">{transaction.date}</span>
                <span className="font-medium text-gray-900">
                  {transaction.description}
                </span>
                <span className="text-gray-700">{transaction.category}</span>
                <span
                  className={'text-right font-medium '}
                  // ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}
                >
                  {transaction.amount}
                  {/* {transaction.type === 'Income'
                    ? `$${Math.abs(transaction.amount).toLocaleString()}`
                    : `($${Math.abs(transaction.amount).toLocaleString()})`} */}
                </span>
                <span className="text-center">-</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
