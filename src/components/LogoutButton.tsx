import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/authStore';
import { ConfirmDialog } from './ConfirmDialog';
import { NavSidebarMenuButton } from './Nav';

export function LogoutButton() {
  const navigate = useNavigate();
  const logout = useAuthStore((store) => store.logout);

  const handleLogout = () => {
    logout(); // Call the logout action from the auth store
    navigate('/login');
  };

  return (
    <ConfirmDialog
      onConfirm={handleLogout}
      title="Are you sure you want to logout?"
    >
      <NavSidebarMenuButton
        className="text-foreground"
        icon={LogOutIcon}
        isActive={false}
        title="Logout"
      />
    </ConfirmDialog>
  );
}
