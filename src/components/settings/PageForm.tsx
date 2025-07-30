import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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

const pageFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  image: z
    .instanceof(FileList)
    .optional()
    .or(z.string().url('Please enter a valid URL').optional()),
});

type PageFormValues = z.infer<typeof pageFormSchema>;

interface PageFormProps {
  onSubmit?: (values: PageFormValues) => Promise<void> | void;
  defaultValues?: IStaticPageData;
}

export function PageForm({ onSubmit, defaultValues }: PageFormProps) {
  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
      ...defaultValues,
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

  const handleSubmit = async (values: PageFormValues) => {
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // Default behavior if no onSubmit handler provided
        toast.success('Settings saved successfully!');
      }
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
                    <Input
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      type="file"
                    />
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
