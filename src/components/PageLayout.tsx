import { useEffect } from 'react';
import { usePage } from '@/hooks/usePage';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  children,
  className,
}: PageLayoutProps) {
  const { setPage } = usePage();

  useEffect(() => {
    setPage(title, description);
    return () => {
      setPage('', ''); // Reset to default on unmount
    };
  }, [title, description, setPage]);

  return <div className={cn(className)}>{children}</div>;
}
