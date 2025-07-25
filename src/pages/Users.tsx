import { InfoIcon } from 'lucide-react';
import { useGetUsersQuery } from '@/api/queries';
import { DataTable } from '@/components/DataTable';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { userColumns } from '@/components/users/UserColumns';

// import { usersData } from '@/data/users';

const metricsData = [
  {
    label: 'New Users',
    value: '4,890',
    hasTooltip: true,
  },
  {
    label: 'Incoming Transfers',
    value: '$3,220.50',
    hasTooltip: true,
  },
  {
    label: 'Outgoing Transfers',
    value: '$5,200.00',
    hasTooltip: true,
  },
  {
    label: 'KYC Pending',
    value: '8 Users',
  },
  {
    label: 'Suspended Accounts',
    value: '28',
  },
];

export default function Users() {
  const { data, isLoading } = useGetUsersQuery();
  return (
    <PageLayout
      className="space-y-6"
      description="Manage and track all user-related activities"
      title="Users"
    >
      {/* Metrics Header */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {metricsData.map((metric, index) => (
              <div
                className={`space-y-2 ${index !== 0 ? 'ml-2 border-l pl-5' : ''}`}
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

      {/* Users Table */}
      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <span>Loading...</span>
        </div>
      )}
      {!isLoading && data ? (
        <DataTable columns={userColumns} data={data.docs} showToolbar />
      ) : (
        <div className="flex h-64 items-center justify-center">
          <span>No users found</span>
        </div>
      )}
    </PageLayout>
  );
}
