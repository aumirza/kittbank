import { InfoIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useGetUsersDashboardQuery, useGetUsersQuery } from '@/api/queries';
import { DataTable } from '@/components/DataTable';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { userColumns, userFilters } from '@/components/users/UserColumns';

// import { usersData } from '@/data/users';

export default function Users() {
  const { data, isLoading } = useGetUsersQuery();
  const { data: dashboardData } = useGetUsersDashboardQuery();

  const metricsData = useMemo(
    () => [
      {
        label: 'New Users',
        value: dashboardData?.newUsers,
        hasTooltip: true,
      },
      {
        label: 'Incoming Transfers',
        value: dashboardData?.incomingTransfers || '$0.00',
        hasTooltip: true,
      },
      {
        label: 'Outgoing Transfers',
        value: dashboardData?.outgoingTransfers || '$0.00',
        hasTooltip: true,
      },
      {
        label: 'KYC Pending',
        value: dashboardData?.kycPending || '0',
      },
      {
        label: 'Suspended Accounts',
        value: dashboardData?.suspendedAccounts || '0',
      },
    ],
    [dashboardData]
  );

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
            {isLoading
              ? [
                  'new-users',
                  'incoming-transfers',
                  'outgoing-transfers',
                  'kyc-pending',
                  'suspended-accounts',
                ].map((key, index) => (
                  <div
                    className={`space-y-2 ${index !== 0 ? 'ml-2 border-l pl-5' : ''}`}
                    key={`skeleton-metric-${key}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">
                        <Skeleton className="h-4 w-20 rounded" />
                      </span>
                      <Skeleton className="h-4 w-4 rounded-full" />
                    </div>
                    <Skeleton className="h-7 w-16 rounded" />
                  </div>
                ))
              : metricsData.map((metric, index) => (
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

      <DataTable
        columns={userColumns}
        data={data?.docs}
        filters={userFilters}
        isLoading={isLoading}
        showGlobalFilter
        showToolbar
        title="Users"
      />
    </PageLayout>
  );
}
