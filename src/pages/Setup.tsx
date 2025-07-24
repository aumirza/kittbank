import { PageLayout } from '@/components/PageLayout';
import { ATMTab } from '@/components/setup/ATMTab';
import { CurrencyTab } from '@/components/setup/CurrencyTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export default function Setup() {
  return (
    <PageLayout className="h-full" title="setup">
      <Tabs className="h-full w-full" defaultValue="atm">
        <TabsList className="b flex h-11 space-x-2 shadow-none">
          <TabsTrigger
            className="h-10 rounded-full px-3 py-2 font-medium text-gray-700 text-sm hover:bg-gray-100 data-[state=active]:border data-[state=active]:border-primary data-[state=active]:bg-amber-100"
            value="atm"
          >
            ATM
          </TabsTrigger>
          <TabsTrigger
            className="h-10 rounded-full px-3 py-2 font-medium text-gray-700 text-sm hover:bg-gray-100 data-[state=active]:border data-[state=active]:border-primary data-[state=active]:bg-amber-100"
            value="currency"
          >
            Currency
          </TabsTrigger>
        </TabsList>
        <TabsContent className="" value="atm">
          <ATMTab />
        </TabsContent>
        <TabsContent className="p-4" value="currency">
          <CurrencyTab />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
