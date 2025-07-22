import { type ComponentProps, forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface PasswordInputProps extends ComponentProps<typeof Input> {
  showToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          className={cn(showToggle && 'pr-16', className)}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          {...props}
        />
        {showToggle && (
          <Button
            className="absolute top-0 right-0 h-full px-3 py-2 font-medium text-primary text-sm hover:no-underline"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            variant="link"
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </Button>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
