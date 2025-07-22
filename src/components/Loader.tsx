import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const loaderVariants = cva('animate-spin', {
  variants: {
    variant: {
      spinner: 'rounded-full border-2 border-current border-t-transparent',
      dots: 'flex space-x-1',
      pulse: 'animate-pulse rounded-full bg-current',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    variant: 'spinner',
    size: 'md',
  },
});

const dotVariants = cva('animate-bounce rounded-full bg-current', {
  variants: {
    size: {
      sm: 'h-1 w-1',
      md: 'h-1.5 w-1.5',
      lg: 'h-2 w-2',
      xl: 'h-3 w-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
  text?: string;
}

const Loader = ({ variant, size, className, text }: LoaderProps) => {
  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              className={cn(dotVariants({ size }))}
              key={i}
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
        {text && <span className="text-muted-foreground text-sm">{text}</span>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className={cn(loaderVariants({ variant, size }))} />
        {text && <span className="text-muted-foreground text-sm">{text}</span>}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(loaderVariants({ variant, size }))} />
      {text && <span className="text-muted-foreground text-sm">{text}</span>}
    </div>
  );
};

export { Loader, loaderVariants };
export type { LoaderProps };
