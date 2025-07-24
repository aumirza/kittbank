import { zodResolver } from '@hookform/resolvers/zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { LocationInput } from './LocationInput';

const atmSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  machine: z.string().min(1, 'Machine type is required'),
  location: z.string().min(1, 'Location is required'),
});

export function AddATMDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(atmSchema),
    defaultValues: {
      name: '',
      company: '',
      machine: '',
      location: '',
    },
  });

  const onSubmit = () => {
    // Handle form submission logic here
    setIsOpen(false);
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
                          <option value="Cash Recycler">Cash Recycler</option>
                          <option value="Deposit Machine">
                            Deposit Machine
                          </option>
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
              name="location"
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
                            form.setValue('location', search.name);
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
              <Button
                className="bg-green-600 px-6 hover:bg-green-700"
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
