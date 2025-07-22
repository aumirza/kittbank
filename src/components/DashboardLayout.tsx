import { Outlet } from 'react-router';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import DashboardHeader from './DashboardHeader';

export default function DashboardLayout() {
  return (
    <div className="bg-accent">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />

        <main className="@container relative flex flex-1 flex-col gap-5 p-8">
          <DashboardHeader />
          <Outlet />
        </main>
        {/* <Toaster /> */}
      </SidebarProvider>
    </div>
  );
}
