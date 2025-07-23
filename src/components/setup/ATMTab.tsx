import { useATMTabStore } from '@/stores/atmTabStore';
import { Tabs, TabsContent } from '../ui/tabs';
import { ATMList } from './ATMList';
import { ATMMap } from './ATMMap';

export function ATMTab() {
  const { activeTab, setActiveTab } = useATMTabStore();
  return (
    <div className="">
      <Tabs className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsContent value="list">
          <ATMList />
        </TabsContent>
        <TabsContent value="map">
          <ATMMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}
