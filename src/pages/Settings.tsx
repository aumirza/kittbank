import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateOrUpdatePageMutation } from '@/api/mutations';
import { useGetAboutUsQuery, useGetPrivacyQuery } from '@/api/queries';
import { PageLayout } from '@/components/PageLayout';
import { PageForm } from '@/components/settings/PageForm';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabs = [
  { label: 'About us', value: 'about' },
  { label: 'Privacy Policy', value: 'privacy' },
];

export default function Settings() {
  const [tabValue, setTabValue] = useState('about');
  const { data: AboutData } = useGetAboutUsQuery(tabValue === 'about');
  const { data: PrivacyData } = useGetPrivacyQuery(tabValue === 'privacy');
  const { mutateAsync } = useCreateOrUpdatePageMutation();

  const dataMap = {
    about: AboutData,
    privacy: PrivacyData,
  };

  const handleFormSubmit = async (_values: {
    title: string;
    description: string;
    image?: FileList | string;
  }) => {
    const formData = new FormData();
    formData.append('title', _values.title);
    formData.append('description', _values.description);
    if (_values?.image?.[0]) {
      formData.append('image', _values.image[0]);
    } else {
      formData.append('image', '');
    }
    try {
      await mutateAsync({ type: tabValue, data: formData });
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings. Please try again.');
    }
  };

  return (
    <PageLayout
      className="flex h-full flex-1 @md:flex-row flex-col"
      title="Settings"
    >
      {/* Sidebar */}
      <div className="@md:1/3 m-3 flex h-full flex-col items-center rounded-2xl bg-background p-6 shadow-md lg:w-1/4">
        <div className="mb-2 text-center">
          <h2 className="font-bold text-xl">Manage security</h2>
        </div>
        <Tabs className="w-full" onValueChange={setTabValue} value={tabValue}>
          <TabsList className="mt-10 flex w-full flex-col gap-0 bg-transparent p-0 shadow-none">
            {tabs.map((tab) => (
              <TabsTrigger
                className={
                  'mb-2 flex w-full items-center justify-start rounded-lg px-5 py-3 text-left font-medium text-base transition-colors data-[state=active]:bg-primary'
                }
                key={tab.value}
                value={tab.value}
              >
                {/* {Icon && <Icon aria-hidden="true" className="mr-3 h-5 w-5" />} */}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="m-3 h-full flex-1 rounded-2xl bg-background p-8 shadow-md">
        <Tabs className="w-full" onValueChange={setTabValue} value={tabValue}>
          <TabsContent className="p-0" value={tabValue}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="m-0 font-bold text-2xl">
                {tabs.find((tab) => tab.value === tabValue)?.label}
              </h2>
            </div>
            <Separator />

            <PageForm
              defaultValues={dataMap[tabValue as keyof typeof dataMap]?.data}
              onSubmit={handleFormSubmit}
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
