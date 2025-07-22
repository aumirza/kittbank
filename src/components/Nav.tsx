import {
  ArrowUpDown,
  BarChartIcon,
  CreditCard,
  LayoutDashboardIcon,
  Settings,
  User,
} from 'lucide-react';
import { NavLink } from 'react-router';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Overview',
    icon: LayoutDashboardIcon,
    url: '/',
  },
  {
    title: 'Ticket',
    icon: CreditCard,
    url: '/ticket',
  },
  {
    title: 'Transactions',
    icon: ArrowUpDown,
    url: '/transactions',
  },
  {
    title: 'User',
    icon: User,
    url: '/user',
  },
  {
    title: 'Analytics',
    icon: BarChartIcon,
    url: '/analytics',
  },
  {
    title: 'Setup',
    icon: Settings,
    url: '/setup',
  },
];

export function Nav() {
  return (
    <SidebarMenu className="gap-1">
      {navigationItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <NavLink className="flex w-full" to={item.url}>
            {({ isActive }) => (
              <SidebarMenuButton size="lg">
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-20" />
                )}
                <div
                  className={cn(
                    'flex size-10 items-center justify-center rounded-full bg-accent',
                    { 'bg-primary': isActive, 'bg-accent': !isActive }
                  )}
                >
                  <item.icon
                    className={cn(
                      'size-5 shrink-0 transition-all duration-200',
                      { 'text-white': isActive }
                    )}
                  />
                </div>
                <span className={cn('text-xl')}>{item.title}</span>
              </SidebarMenuButton>
            )}
          </NavLink>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
