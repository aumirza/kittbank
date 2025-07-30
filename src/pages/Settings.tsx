import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateOrUpdatePageMutation } from '@/api/mutations';
import {
  useGetAboutUsQuery,
  useGetContactDetailsQuery,
  useGetCookiesPolicyQuery,
  useGetPrivacyQuery,
  useGetReturnRefundPolicyQuery,
  useGetTermsQuery,
} from '@/api/queries';
import { PageLayout } from '@/components/PageLayout';
import { ContactForm } from '@/components/settings/ContactForm';
import { FaqForm } from '@/components/settings/FaqForm';
import { PageForm } from '@/components/settings/PageForm';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabs = [
  { label: 'About us', value: 'about' },
  { label: 'Privacy Policy', value: 'privacy' },
  { label: 'Return & Refund Policy', value: 'returnRefund' },
  { label: 'Cookies Policy', value: 'cookies' },
  { label: 'Terms & Conditions', value: 'terms' },
  { label: 'FAQs', value: 'faq' },
  { label: 'Contact Details', value: 'contact' },
];

export default function Settings() {
  const [tabValue, setTabValue] = useState('about');
  const { data: AboutData } = useGetAboutUsQuery(tabValue === 'about');
  const { data: PrivacyData } = useGetPrivacyQuery(tabValue === 'privacy');
  const { data: ReturnRefundData } = useGetReturnRefundPolicyQuery(
    tabValue === 'returnRefund'
  );
  const { data: CookiesData } = useGetCookiesPolicyQuery(
    tabValue === 'cookies'
  );
  const { data: TermsData } = useGetTermsQuery(tabValue === 'terms');
  const { data: ContactData } = useGetContactDetailsQuery(
    tabValue === 'contact'
  );
  const { mutateAsync } = useCreateOrUpdatePageMutation();

  const dataMap = {
    about: tabValue === 'about' ? AboutData : null,
    privacy: tabValue === 'privacy' ? PrivacyData : null,
    returnRefund: tabValue === 'returnRefund' ? ReturnRefundData : null,
    cookies: tabValue === 'cookies' ? CookiesData : null,
    terms: tabValue === 'terms' ? TermsData : null,
    faq: null, // FAQ data is handled directly in FaqForm component
    contact: tabValue === 'contact' ? ContactData : null,
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
      <div className="sticky top-2 m-3 flex h-fit max-h-[85vh] @md:w-1/4 flex-col rounded-2xl bg-background p-6 shadow-md lg:w-1/4">
        <div className="mb-6 w-full text-center">
          <h2 className="font-bold text-xl">Manage security</h2>
        </div>
        <div className="flex flex-1 flex-col">
          <Tabs
            className="flex h-full w-full flex-col"
            onValueChange={setTabValue}
            value={tabValue}
          >
            <TabsList className="flex h-auto w-full flex-col gap-0 bg-transparent p-0 shadow-none">
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

            {tabValue === 'contact' && (
              <ContactForm defaultValues={dataMap.contact?.data} />
            )}
            {tabValue === 'faq' && <FaqForm />}
            {tabValue !== 'contact' && tabValue !== 'faq' && (
              <PageForm
                defaultValues={
                  dataMap[
                    tabValue as Exclude<keyof typeof dataMap, 'contact' | 'faq'>
                  ]?.data
                }
                onSubmit={handleFormSubmit}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
