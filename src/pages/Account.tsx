import { Lock, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { AccountForm } from '@/components/account/AccountForm';
import { UserInfo } from '@/components/account/UserInfo';
import { PageLayout } from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabs = [
  { label: 'Account', value: 'account', icon: User },
  { label: 'Setting', value: 'setting', icon: Settings },
  { label: 'Security', value: 'security', icon: Lock },
];

export default function AccountPage() {
  const [tabValue, setTabValue] = useState('account');

  return (
    <PageLayout
      className="flex h-full flex-1 @md:flex-row flex-col"
      title="Account"
    >
      {/* Sidebar */}
      <aside className="@md:1/3 m-3 flex h-full flex-col items-center rounded-2xl bg-background p-6 shadow-md lg:w-1/4">
        <UserInfo />
        <Tabs className="w-full" onValueChange={setTabValue} value={tabValue}>
          <TabsList className="mt-10 flex w-full flex-col gap-0 bg-transparent p-0 shadow-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  className={
                    'mb-2 flex w-full items-center justify-start rounded-lg px-5 py-3 text-left font-medium text-base transition-colors data-[state=active]:bg-primary'
                  }
                  key={tab.value}
                  value={tab.value}
                >
                  <Icon aria-hidden="true" className="mr-3 h-5 w-5" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </aside>

      {/* Main Content */}
      <main className="m-3 h-full flex-1 rounded-2xl bg-background p-8 shadow-md">
        <Tabs className="w-full" onValueChange={setTabValue} value={tabValue}>
          <TabsContent className="p-0" value="account">
            <AccountForm />
          </TabsContent>
          <TabsContent className="p-0" value="setting">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="m-0 font-bold text-2xl">Setting</h2>
            </div>
            <Separator />
            <div className="mt-8 rounded-xl border border-border bg-card">
              <div className="divide-y divide-border">
                <div className="px-6 py-4 font-medium text-lg">
                  Email Notification
                </div>
                <div className="px-6 py-4 font-medium text-lg">
                  2FA via Email
                </div>
                <div className="px-6 py-4 font-medium text-lg">2FA via SMS</div>
                <div className="px-6 py-4 font-medium text-lg">Web Authn</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent className="p-0" value="security">
            {/* Security tab content placeholder */}
          </TabsContent>
        </Tabs>
      </main>
    </PageLayout>
  );
}
