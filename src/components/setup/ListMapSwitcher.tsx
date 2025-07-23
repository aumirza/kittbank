import { MapPinIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useATMTabStore } from '@/stores/atmTabStore';

export function ListMapSwitcher() {
  const { activeTab, setActiveTab } = useATMTabStore();

  return (
    <div className="flex gap-2 rounded-md border bg-gray-100 p-1">
      <Button
        className={`py-0 ${activeTab === 'list' ? 'bg-amber-50 hover:bg-amber-100' : ''}`}
        onClick={() => setActiveTab('list')}
        size="icon"
        type="button"
        variant={activeTab === 'list' ? 'default' : 'ghost'}
      >
        <MenuIcon
          className={cn('size-5', activeTab === 'list' ? 'text-primary' : '')}
        />
      </Button>
      <Button
        className={`${activeTab === 'map' ? 'bg-amber-50 hover:bg-amber-100' : ''}`}
        onClick={() => setActiveTab('map')}
        size="icon"
        type="button"
        variant={activeTab === 'map' ? 'default' : 'ghost'}
      >
        <MapPinIcon
          className={cn('size-5', activeTab === 'map' ? 'text-primary' : '')}
        />
      </Button>
    </div>
  );
}
