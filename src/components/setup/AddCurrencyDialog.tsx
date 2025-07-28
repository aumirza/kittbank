import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddCurrencyMutation } from '@/api/mutations';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ICurrency } from '@/types/currency';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { LoadingButton } from '../LoadingButton';

const currencySchema = z.object({
  name: z.string().min(1, 'Currency Name is required'),
  code: z.string().min(1, 'Code is required'),
  symbol: z.string().min(1, 'Symbol is required'),
  value: z.string().min(1, 'Value is required'),
  autoUpdate: z.boolean(),
});

type CurrencyFormData = z.infer<typeof currencySchema>;

interface AddCurrencyDialogProps {
  children?: React.ReactNode;
  currency?: Partial<ICurrency>;
  isEdit?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddCurrencyDialog({
  children,
  currency,
  open = false,
  onOpenChange,
}: AddCurrencyDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  const { mutateAsync } = useAddCurrencyMutation();

  const form = useForm({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      name: currency?.name || '',
      code: currency?.code || '',
      symbol: currency?.symbol || '',
      value: '',
      autoUpdate: currency?.autoUpdate ?? true,
    },
  });

  const onSubmit = async (data: CurrencyFormData) => {
    try {
      await mutateAsync(data);
      setIsOpen(false);
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message:
          getErrorMessage(error) || 'Failed to add currency. Please try again.',
      });
    }
  };

  const handleChange = (toOpen: boolean) => {
    setIsOpen(toOpen);
    if (onOpenChange) {
      onOpenChange(toOpen);
    }
    if (!toOpen) {
      form.reset();
    }
  };

  return (
    <Dialog onOpenChange={handleChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-auto sm:max-h-[90vh] sm:max-w-4xl">
        <DialogHeader className="border-b pb-5">
          <DialogTitle>Add Currency</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Currency Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded"
                        placeholder="Enter Currency Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Code<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded"
                        placeholder="Enter Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Symbol<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded"
                        placeholder="Enter Symbol"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Value in Admin Region (INR)
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded"
                        placeholder="Enter Value"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <FormField
                control={form.control}
                name="autoUpdate"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel>
                      Auto Update<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <span>OFF</span>
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors focus:outline-none ${field.value ? 'bg-green-500' : 'bg-gray-300'}`}
                          onClick={() => field.onChange(!field.value)}
                          type="button"
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${field.value ? 'translate-x-6' : 'translate-x-1'}`}
                          />
                        </button>
                        <span>ON</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors.root && (
              <p className="text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
            <DialogFooter className="mt-6 flex w-full justify-center gap-2">
              <Button
                className="px-6"
                onClick={() => {
                  form.reset();
                  setIsOpen(false);
                }}
                type="button"
                variant="outline"
              >
                Clear
              </Button>
              <LoadingButton
                className="bg-green-600 px-6 hover:bg-green-700"
                isLoading={form.formState.isSubmitting}
                type="submit"
              >
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
