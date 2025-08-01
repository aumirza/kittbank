import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useCreateOrUpdateAboutMutation } from '@/api/mutations';
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
import type { IStaticPageData } from '@/types/page';
import { ImageInput } from '../ui/image-input';

const aboutFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  image: z
    .instanceof(File)
    .optional()
    .or(z.url('Please enter a valid URL').optional()),
});

type AboutFormValues = z.infer<typeof aboutFormSchema>;

interface AboutFormProps {
  defaultValues?: IStaticPageData;
}

export function AboutForm({ defaultValues }: AboutFormProps) {
  const { mutateAsync } = useCreateOrUpdateAboutMutation();
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  // Update form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title || '',
        description: defaultValues.description || '',
        image: defaultValues.image || undefined,
      });
    } else {
      // Reset to empty values when no data
      form.reset({
        title: '',
        description: '',
        image: undefined,
      });
    }
  }, [defaultValues, form]);

  const handleSubmit = async (values: AboutFormValues) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      if (values.image instanceof File) {
        formData.append('image', values.image);
      }
      await mutateAsync(formData);
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-5 space-y-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for your organization"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[120px]"
                      placeholder="Write a description about your organization..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={() => form.reset()} type="button" variant="outline">
            Reset
          </Button>
          <LoadingButton isLoading={form.formState.isSubmitting} type="submit">
            Save Changes
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
