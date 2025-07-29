import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/authStore';

export function UserInfo() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  // Generate initials from full name or first/last name
  const getInitials = (
    fullName: string,
    firstName?: string,
    lastName?: string
  ) => {
    if (fullName) {
      return fullName
        .split(' ')
        .map((name) => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }

    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }

    return 'U';
  };

  const initials = getInitials(user.fullName, user.firstName, user.lastName);

  return (
    <div className="mb-8 flex w-full items-center gap-3">
      <Avatar className="h-12 w-12">
        <AvatarImage alt={`${user.fullName} avatar`} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-semibold text-base">{user.fullName}</div>
        <div className="text-muted-foreground text-xs">{user.email}</div>
      </div>
    </div>
  );
}
