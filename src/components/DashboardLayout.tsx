import { Outlet } from 'react-router';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

export default function DashboardLayout() {
  return (
    <div className="bg-accent">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main className="@container relative flex flex-1 flex-col p-10 md:p-10">
          <Outlet />
        </main>
        {/* <Toaster /> */}
      </SidebarProvider>
    </div>
  );
}
