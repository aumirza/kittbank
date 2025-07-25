import { Bell, ChevronDown, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePage } from '@/hooks/usePage';
import { useAuthStore } from '@/stores/authStore';

export default function DashboardHeader() {
  const { title, description } = usePage();
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return null;
  } // Ensure user is defined

  return (
    <header className="flex items-center justify-between rounded-xl bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="font-semibold text-gray-900 text-xl">{title}</h1>
        {description && <p className="text-gray-500 text-sm">{description}</p>}
      </div>
      <div className="flex items-center gap-4">
        <Button aria-label="Search" size="icon" variant="outline">
          <Search aria-hidden="true" className="size-5" />
        </Button>
        <Button aria-label="Notifications" size="icon" variant="outline">
          <Bell aria-hidden="true" className="size-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex h-auto items-center gap-3 px-2 py-1.5"
              variant="ghost"
            >
              <Avatar className="size-10">
                <AvatarImage alt={user.firstName} />
                <AvatarFallback>
                  {user.firstName.charAt(0).toUpperCase() +
                    user.lastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="font-medium text-gray-900 text-sm">
                  {`${user.firstName} ${user.lastName}`}
                </span>
                <span className="text-gray-500 text-xs">{user.email}</span>
              </div>
              <ChevronDown
                aria-hidden="true"
                className="ml-2 size-4 text-gray-500"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
