import {
  FunnelIcon,
  PlusIcon,
  Search,
  StickyNoteIcon,
  UploadIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '../ui/card';
import { AddATMDialog } from './AddATMDialog';
import { ListMapSwitcher } from './ListMapSwitcher';

export function ATMMap() {
  return (
    <div className="space-y-5">
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 ">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-5 h-4 w-4 text-muted-foreground" />
              <Input
                className="max-full h-12 rounded-full pl-10"
                placeholder="Search"
              />
            </div>

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
      <Card>
        <CardContent>
          {/* Map Component Placeholder */}
          <div className="relative flex h-[27rem] items-center justify-center bg-gray-200">
            <p className="text-gray-500">Map will be displayed here</p>
            <div className="absolute top-4 right-4">
              <ListMapSwitcher />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
