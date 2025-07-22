import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { Nav } from './Nav';

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-border/40 border-b p-6">
        <div
          className={cn(
            'flex items-center transition-all duration-300',
            isCollapsed ? 'justify-center' : 'justify-start'
          )}
        >
          {isCollapsed ? (
            <SidebarTrigger className="size-8 rounded-lg transition-colors hover:bg-accent" />
          ) : (
            <Logo />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={cn('py-6', isCollapsed ? 'px-2' : 'px-4')}>
        <Nav />
      </SidebarContent>

      <SidebarFooter className="border-border/40 border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                'flex items-center gap-3 rounded-xl bg-accent/20 px-3 py-3',
                isCollapsed ? 'justify-center' : 'justify-between'
              )}
            >
              {!isCollapsed && (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9 border-2 border-primary/20">
                      <AvatarImage alt="User" src="/avatars/user.jpg" />
                      <AvatarFallback className="bg-primary font-semibold text-primary-foreground text-sm">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">John Doe</span>
                      <span className="text-muted-foreground text-xs">
                        Premium Account
                      </span>
                    </div>
                  </div>
                  <Button
                    className="size-9 rounded-xl transition-colors hover:bg-destructive/10 hover:text-destructive"
                    size="icon"
                    variant="ghost"
                  >
                    <LogOut className="size-4" />
                  </Button>
                </>
              )}
              {isCollapsed && (
                <Button
                  className="size-9 rounded-xl transition-colors hover:bg-destructive/10 hover:text-destructive"
                  size="icon"
                  variant="ghost"
                >
                  <LogOut className="size-4" />
                </Button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
