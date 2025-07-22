import {
  ChevronsLeftIcon,
  LogOut,
  SettingsIcon,
  User2Icon,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { Nav, NavSidebarMenuButton } from './Nav';

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="border-border/40 border-b p-5">
        <div
          className={cn(
            'flex items-center transition-all duration-300',
            isCollapsed ? 'justify-center' : 'justify-start'
          )}
        >
          <div className="flex items-center gap-2">
            {!isCollapsed && <Logo />}
            <ChevronsLeftIcon
              className={cn(
                'ml-2 cursor-pointer transition-transform',
                isCollapsed ? 'rotate-180' : ''
              )}
              onClick={() => toggleSidebar()}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className={cn('py-6', isCollapsed ? 'px-2' : 'px-4')}>
        <Nav />
      </SidebarContent>

      <SidebarFooter className="border-border/40 border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <NavSidebarMenuButton
              icon={User2Icon}
              isActive={false}
              title="Account"
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavSidebarMenuButton
              icon={SettingsIcon}
              isActive={false}
              title="Settings"
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavSidebarMenuButton
              icon={LogOut}
              isActive={false}
              title="Logout"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
