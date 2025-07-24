import { FunnelIcon } from 'lucide-react';
import type { FC } from 'react';
import atmMarker from '@/assets/images/atm-marker.png';
import branchMarker from '@/assets/images/branch-marker.png';
import { Button } from '@/components/ui/button';

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
      <div className="mt-2 flex gap-2 rounded bg-accent p-1">
        <Button
          aria-pressed={value === 'all'}
          onClick={() => onChange('all')}
          type="button"
          variant={value === 'all' ? 'default' : 'ghost'}
        >
          <div className="relative">
            <img alt="ATM Marker" className="size-6" src={atmMarker} />
            <img
              alt="Branch Marker"
              className="absolute top-0 left-3 size-6"
              src={branchMarker}
            />
          </div>
          All
        </Button>
        <Button
          aria-pressed={value === 'atm'}
          onClick={() => onChange('atm')}
          type="button"
          variant={value === 'atm' ? 'default' : 'ghost'}
        >
          <img alt="ATM Marker" className="size-6" src={atmMarker} />
          ATM
        </Button>
        <Button
          aria-pressed={value === 'branch'}
          onClick={() => onChange('branch')}
          type="button"
          variant={value === 'branch' ? 'default' : 'ghost'}
        >
          <img alt="Branch Marker" className="size-6" src={branchMarker} />
          Bank Branch
        </Button>
      </div>
    </div>
  );
};
