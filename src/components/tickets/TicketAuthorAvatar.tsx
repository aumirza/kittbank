import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TicketAuthorAvatarProps {
  name: string;
  avatar?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TicketAuthorAvatar({
  name,
  avatar,
  size = 'md',
}: TicketAuthorAvatarProps) {
  const sizeClasses = {
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Avatar className={sizeClasses[size]}>
      {avatar ? <AvatarImage alt={name} src={avatar} /> : null}
      <AvatarFallback className="font-medium text-xs">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
