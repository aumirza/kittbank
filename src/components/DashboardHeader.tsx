import { BellIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
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
import { ConfirmDialog } from './ConfirmDialog';

export default function DashboardHeader() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { title, description } = usePage();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  if (!user) {
    return null;
  } // Ensure user is defined

  const handleLogout = () => {
    logout(); // Call the logout action from the auth store
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between rounded-xl bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="font-semibold text-gray-900 text-xl">{title}</h1>
        {description && <p className="text-gray-500 text-sm">{description}</p>}
      </div>
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Notifications"
              className="rounded-full"
              size="icon"
              variant="outline"
            >
              <BellIcon aria-hidden="true" className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="px-4 py-2 font-medium text-gray-900 text-sm">
              Notifications
            </div>
            <DropdownMenuSeparator />
            {/* Example notification items, replace with real data as needed */}
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="font-medium text-gray-900 text-sm">
                No new notifications
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* User Dropdown */}
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
              <ChevronDownIcon
                aria-hidden="true"
                className="ml-2 size-4 text-gray-500"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <Link to="/account">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowConfirmDialog(true)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ConfirmDialog
          onConfirm={handleLogout}
          onOpenChange={setShowConfirmDialog}
          open={showConfirmDialog}
          title="Are you sure you want to logout?"
        />
      </div>
    </header>
  );
}
