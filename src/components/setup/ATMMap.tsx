import {
  FunnelIcon,
  PlusIcon,
  Search,
  StickyNoteIcon,
  UploadIcon,
} from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SearchBoxFeatureProperties } from '@/lib/mapbox';
import { Loader } from '../Loader';
import { MapSearchInput } from '../MapSearchInput';
import { Card, CardContent } from '../ui/card';
import { AddATMDialog } from './AddATMDialog';

const ATMLocatorMap = lazy(() => import('./ATMLocatorMap'));

import { ATMMapLegend } from './ATMMapLegend';
import { ListMapSwitcher } from './ListMapSwitcher';

export function ATMMap() {
  const [legendValue, setLegendValue] = useState<'all' | 'atm' | 'branch'>(
    'all'
  );
  const [searchValue, setSearchValue] =
    useState<SearchBoxFeatureProperties | null>(null);

  return (
    <div className="h-full min-h-0 space-y-5">
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 ">
            {/* Search Input */}

            <MapSearchInput
              onChange={setSearchValue}
              render={(inputProps) => (
                <div className="relative flex-1">
                  <Search className="-translate-y-1/2 absolute top-1/2 left-5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="max-full h-12 rounded-full pl-10"
                    placeholder="Search"
                    {...inputProps}
                  />
                </div>
              )}
            />

            <div className="grid flex-1 grid-cols-4 gap-2">
              {/* Export Button */}
              <Button className="h-12 rounded-full" size="sm" variant="outline">
                <FunnelIcon className="mr-2 h-4 w-4" />
                All Filter
              </Button>
              {/* Export Button */}
              <Button className="h-12 rounded-full" size="sm" variant="outline">
                <StickyNoteIcon className="mr-2 h-4 w-4" />
                Export
              </Button>
              {/* Upload Button */}
              <Button className="h-12 rounded-full" size="sm" variant="outline">
                <UploadIcon className="mr-2 h-4 w-4" />
                Bulk Upload
              </Button>
              {/* Add Button */}
              <AddATMDialog>
                <Button
                  className="h-12 rounded-full"
                  size="sm"
                  variant="outline"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </AddATMDialog>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="relative h-[29rem] w-full flex-1 rounded-md border bg-gray-200 shadow-lg">
        {/* Controlled Legend Card */}
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader size="lg" />
            </div>
          }
        >
          <div className="absolute top-4 left-4 z-10">
            <ATMMapLegend onChange={setLegendValue} value={legendValue} />
          </div>
          <ATMLocatorMap marker={legendValue} search={searchValue} />
          <div className="absolute top-4 right-4">
            <ListMapSwitcher />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
