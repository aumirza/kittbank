import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddAtmMutation } from '@/api/mutations';
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
import type { IATM } from '@/types/atm';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { LoadingButton } from '../LoadingButton';
import { LocationInput } from './LocationInput';

const atmSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  machine: z.string().min(1, 'Machine type is required'),
  locationInWord: z.string().min(1, 'Location is required'),
  latitude: z.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude'),
  longitude: z
    .number()
    .min(-180, 'Invalid longitude')
    .max(180, 'Invalid longitude'),
});

export function AddATMDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync } = useAddAtmMutation();

  const form = useForm<z.infer<typeof atmSchema>>({
    resolver: zodResolver(atmSchema),
    defaultValues: {
      name: '',
      company: '',
      machine: '',
      locationInWord: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof atmSchema>) => {
    try {
      const valuesToSubmit = {
        ...values,
        location: {
          type: 'Point',
          coordinates: [values.longitude, values.latitude],
        },
      } as Partial<IATM>;
      await form.trigger();
      await mutateAsync(valuesToSubmit);
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message:
          getErrorMessage(error) || 'Failed to add ATM. Please try again.',
      });
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-auto sm:max-h-[90vh] sm:max-w-4xl">
        <DialogHeader className="border-b pb-5">
          <DialogTitle>Add ATM</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="">
              <div className="mb-1 block font-medium text-gray-700 text-sm">
                Atm Detail <span className="text-red-500">*</span>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name*</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded"
                          placeholder="Enter ATM Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company*</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded"
                          placeholder="Enter Company Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="machine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Machine*</FormLabel>
                      <FormControl>
                        <select
                          className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          {...field}
                        >
                          <option value="">Select Machine Type</option>
                          <option value="ATM">ATM</option>
                          <option value="Branch">Branch</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="locationInWord"
              render={() => (
                <FormItem className="mt-8">
                  <FormLabel>
                    Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative h-96">
                      <LocationInput
                        markerType="atm"
                        onChange={(search) => {
                          if (search) {
                            form.setValue('locationInWord', search.name);
                            form.setValue(
                              'latitude',
                              search.coordinates.latitude
                            );
                            form.setValue(
                              'longitude',
                              search.coordinates.longitude
                            );
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex w-full justify-center gap-2">
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
