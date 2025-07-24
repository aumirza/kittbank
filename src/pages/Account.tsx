import { Lock, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';

const tabs = [
  { label: 'Account', value: 'account', icon: User },
  { label: 'Setting', value: 'setting', icon: Settings },
  { label: 'Security', value: 'security', icon: Lock },
];

export default function AccountPage() {
  const [form, setForm] = useState({
    fullName: 'Filippo Inzaghi',
    email: 'filizanghi@finsight.co',
    phone: '+91-7896523145',
    role: 'Super Admin',
  });
  const [tabValue, setTabValue] = useState('account');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="m-3 flex w-[270px] flex-col items-center rounded-2xl bg-background p-6 shadow-md">
        <div className="mb-8 flex w-full items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage />
            <AvatarFallback>FI</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold text-base">Filippo Inzaghi</div>
            <div className="text-muted-foreground text-xs">
              filizanghi@finsight.co
            </div>
          </div>
        </div>
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
      <main className="m-3 flex-1 rounded-2xl bg-background p-8 shadow-md">
        <Tabs className="w-full" onValueChange={setTabValue} value={tabValue}>
          <TabsContent className="p-0" value="account">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="m-0 font-bold text-2xl">Account</h2>
              <div>
                <Button className="mr-2 rounded-full" variant="outline">
                  Cancel
                </Button>
                <Button className="rounded-full bg-green-500 hover:bg-green-700">
                  Save
                </Button>
              </div>
            </div>
            <Separator />
            <div className="mt-8">
              <div className="mb-4 flex items-center gap-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage />
                  <AvatarFallback>FI</AvatarFallback>
                </Avatar>
                <div className="font-medium text-base">Avatar</div>
              </div>
              <form className="flex flex-wrap gap-6">
                <div className="min-w-[260px] flex-1">
                  <label
                    className="mb-1 block font-medium text-sm"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <Input
                    className="mb-4"
                    id="fullName"
                    name="fullName"
                    onChange={handleChange}
                    value={form.fullName}
                  />
                </div>
                <div className="min-w-[260px] flex-1">
                  <label
                    className="mb-1 block font-medium text-sm"
                    htmlFor="email"
                  >
                    Email ID
                  </label>
                  <Input
                    className="mb-4"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                  />
                </div>
                <div className="min-w-[260px] flex-1">
                  <label
                    className="mb-1 block font-medium text-sm"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <Input
                    className="mb-4"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    value={form.phone}
                  />
                </div>
                <div className="min-w-[260px] flex-1">
                  <label
                    className="mb-1 block font-medium text-sm"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <select
                    className="w-full rounded-lg border border-input px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                    id="role"
                    name="role"
                    onChange={handleChange}
                    value={form.role}
                  >
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                </div>
              </form>
            </div>
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
    </div>
  );
}
