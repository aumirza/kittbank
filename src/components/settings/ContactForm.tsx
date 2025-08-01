import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useCreateOrUpdateContactMutation } from '@/api/mutations';
import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { IContactPageData } from '@/types/page';
import { ImageInput } from '../ui/image-input';

const contactFormSchema = z.object({
  image: z.instanceof(File).or(z.url('Please enter a valid URL')).optional(),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  fb: z.url('Please enter a valid Facebook URL').or(z.literal('')).optional(),
  google: z.url('Please enter a valid Google URL').or(z.literal('')).optional(),
  instagram: z
    .url('Please enter a valid Instagram URL')
    .or(z.literal(''))
    .optional(),
  youtube: z
    .url('Please enter a valid YouTube URL')
    .or(z.literal(''))
    .optional(),
  map: z.string().optional(),
  mapLink: z.url('Please enter a valid map URL').or(z.literal('')).optional(),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(500, 'Address must be less than 500 characters'),
  fax: z.string().optional(),
  compliancePhone: z.string().min(1, 'Compliance phone is required'),
  onboardingPhone: z.string().min(1, 'Onboarding phone is required'),
  customerCarePhone: z.string().min(1, 'Customer care phone is required'),
  generalEnquiryPhone: z.string().min(1, 'General enquiry phone is required'),
  email: z
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSubmit?: (values: ContactFormValues) => Promise<void> | void;
  defaultValues?: IContactPageData;
}

export function ContactForm({ defaultValues }: ContactFormProps) {
  const { mutateAsync: mutateContact } = useCreateOrUpdateContactMutation();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      image: undefined,
      name: '',
      fb: '',
      google: '',
      instagram: '',
      youtube: '',
      map: '',
      mapLink: '',
      address: '',
      fax: '',
      compliancePhone: '',
      onboardingPhone: '',
      customerCarePhone: '',
      generalEnquiryPhone: '',
      email: '',
      ...defaultValues,
    },
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const getResetValues = useCallback(
    (defValues?: IContactPageData) => ({
      image: defValues?.image ?? undefined,
      name: defValues?.name ?? '',
      fb: defValues?.fb ?? '',
      google: defValues?.google ?? '',
      instagram: defValues?.instagram ?? '',
      youtube: defValues?.youtube ?? '',
      map: defValues?.map ?? '',
      mapLink: defValues?.mapLink ?? '',
      address: defValues?.address ?? '',
      fax: defValues?.fax ?? '',
      compliancePhone: defValues?.compliancePhone ?? '',
      onboardingPhone: defValues?.onboardingPhone ?? '',
      customerCarePhone: defValues?.customerCarePhone ?? '',
      generalEnquiryPhone: defValues?.generalEnquiryPhone ?? '',
      email: defValues?.email ?? '',
    }),
    []
  );

  useEffect(() => {
    if (defaultValues) {
      reset(getResetValues(defaultValues));
    }
  }, [defaultValues, reset, getResetValues]);

  const handleSubmit = useCallback(
    async (values: ContactFormValues) => {
      try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          if (value !== undefined && value !== null && value !== '') {
            if (
              key === 'image' &&
              value instanceof FileList &&
              value.length > 0
            ) {
              formData.append(key, value[0]);
            } else {
              formData.append(key, String(value));
            }
          }
        }
        await mutateContact(formData);
      } catch {
        toast.error('Failed to save contact details. Please try again.');
      }
    },
    [mutateContact]
  );

  return (
    <div className="mt-6">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Image Upload */}
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageInput multiple={false} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Text Inputs */}
            {[
              {
                name: 'name',
                label: 'Company Name',
                placeholder: 'Enter company name',
                type: 'text',
              },
              {
                name: 'email',
                label: 'Email',
                placeholder: 'Enter email address',
                type: 'email',
              },
              {
                name: 'compliancePhone',
                label: 'Compliance Phone',
                placeholder: 'Enter compliance phone number',
                type: 'tel',
              },
              {
                name: 'onboardingPhone',
                label: 'Onboarding Phone',
                placeholder: 'Enter onboarding phone number',
                type: 'tel',
              },
              {
                name: 'customerCarePhone',
                label: 'Customer Care Phone',
                placeholder: 'Enter customer care phone number',
                type: 'tel',
              },
              {
                name: 'generalEnquiryPhone',
                label: 'General Enquiry Phone',
                placeholder: 'Enter general enquiry phone number',
                type: 'tel',
              },
              {
                name: 'fax',
                label: 'Fax (Optional)',
                placeholder: 'Enter fax number',
                type: 'text',
              },
              {
                name: 'fb',
                label: 'Facebook URL (Optional)',
                placeholder: 'Enter Facebook URL',
                type: 'text',
              },
              {
                name: 'google',
                label: 'Google URL (Optional)',
                placeholder: 'Enter Google URL',
                type: 'text',
              },
              {
                name: 'instagram',
                label: 'Instagram URL (Optional)',
                placeholder: 'Enter Instagram URL',
                type: 'text',
              },
              {
                name: 'youtube',
                label: 'YouTube URL (Optional)',
                placeholder: 'Enter YouTube URL',
                type: 'text',
              },
              {
                name: 'mapLink',
                label: 'Map Link (Optional)',
                placeholder: 'Enter map link URL',
                type: 'text',
              },
            ].map(({ name, label, placeholder, type }) => (
              <FormField
                control={form.control}
                key={name}
                name={name as keyof ContactFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        placeholder={placeholder}
                        ref={field.ref}
                        type={type}
                        value={
                          typeof field.value === 'string' ? field.value : ''
                        }
                        // do not spread field, to avoid FileList
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {/* Address */}
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Enter company address"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Map Embed */}
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="map"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Map Embed Code (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        placeholder="Enter map embed code"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <LoadingButton
              className="min-w-32"
              isLoading={isSubmitting}
              type="submit"
            >
              Save Changes
            </LoadingButton>
            <Button onClick={() => reset()} type="button" variant="outline">
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
