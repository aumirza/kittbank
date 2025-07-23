import { InfoIcon } from 'lucide-react';
import { DataTable } from '@/components/DataTable';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { userColumns } from '@/components/users/UserColumns';
import { usersData } from '@/data/users';

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
      <DataTable
        columns={userColumns}
        data={usersData}
        showPagination={true}
        showToolbar={true}
        title="User List"
      />
    </PageLayout>
  );
}
