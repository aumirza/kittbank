import { Outlet } from 'react-router';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import DashboardHeader from './DashboardHeader';
import { Toaster } from './ui/sonner';

export function DashboardLayout() {
  return (
    <div className="bg-accent">
      <SidebarProvider
        defaultOpen={true}
        // style={
        //   {
        //     '--sidebar-width': '19rem',
        //   } as React.CSSProperties
        // }
      >
        <AppSidebar />

        <SidebarInset className="@container bg-accent p-3">
          <DashboardHeader />
          <div className="p-5 px-0">
            <Outlet />
          </div>
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}
