import { FunnelIcon } from 'lucide-react';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ATMMapLegendProps {
  value: 'all' | 'atm' | 'branch';
  onChange: (value: 'all' | 'atm' | 'branch') => void;
  onFilterClick?: () => void;
}

export const ATMMapLegend: FC<ATMMapLegendProps> = ({
  value,
  onChange,
  onFilterClick,
}) => {
  return (
    <div className="flex min-w-[320px] flex-col gap-3 rounded-xl bg-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg leading-tight">
          Find the ATM or Bank
          <br />
          Branch at Your Location
        </div>
        <Button
          aria-label="Filter options"
          className="ml-2"
          onClick={onFilterClick}
          size="icon"
          type="button"
          variant="ghost"
        >
          <FunnelIcon className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
      <div className="mt-2 flex gap-2">
        <Button
          aria-pressed={value === 'all'}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2 font-medium',
            value === 'all'
              ? 'bg-gray-900 text-white'
              : 'border border-gray-200 bg-white text-gray-900'
          )}
          onClick={() => onChange('all')}
          type="button"
          variant={value === 'all' ? 'default' : 'outline'}
        >
          <span className="inline-flex items-center justify-center">
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="20"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <circle cx="12" cy="12" fill="white" r="5" />
            </svg>
          </span>
          All
        </Button>
        <Button
          aria-pressed={value === 'atm'}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2 font-medium',
            value === 'atm'
              ? 'bg-gray-900 text-white'
              : 'border border-gray-200 bg-white text-gray-900'
          )}
          onClick={() => onChange('atm')}
          type="button"
          variant={value === 'atm' ? 'default' : 'outline'}
        >
          <span className="inline-flex items-center justify-center">
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="20"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
                fill="#1e293b"
              />
            </svg>
          </span>
          ATM
        </Button>
        <Button
          aria-pressed={value === 'branch'}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2 font-medium',
            value === 'branch'
              ? 'bg-gray-900 text-white'
              : 'border border-gray-200 bg-white text-gray-900'
          )}
          onClick={() => onChange('branch')}
          type="button"
          variant={value === 'branch' ? 'default' : 'outline'}
        >
          <span className="inline-flex items-center justify-center">
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              viewBox="0 0 24 24"
              width="20"
            >
              <rect fill="#059669" height="10" rx="2" width="16" x="4" y="7" />
              <rect fill="white" height="2" rx="1" width="8" x="8" y="11" />
            </svg>
          </span>
          Bank Branch
        </Button>
      </div>
    </div>
  );
};
