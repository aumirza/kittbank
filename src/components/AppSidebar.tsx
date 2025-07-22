import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from './Logo';
import { Nav } from './Nav';

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar className="rounded-full" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-center">
          {state === 'collapsed' ? (
            <SidebarTrigger className="size-8" />
          ) : (
            <Logo />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu className="gap-0">
          <Nav />
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
