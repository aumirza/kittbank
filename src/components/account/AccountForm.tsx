import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUpdateUserMutation } from '@/api/mutations';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/stores/authStore';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { LoadingButton } from '../LoadingButton';

const accountFormSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().min(8, 'Phone number is required'),
  role: z.enum(['ADMIN', 'USER']),
});

export function AccountForm() {
  const user = useAuthStore((state) => state.user);
  const { mutateAsync } = useUpdateUserMutation();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.mobileNumber || '',
      role: user?.userType || 'USER',
    },
  });

  const onSubmit = async (values: z.infer<typeof accountFormSchema>) => {
    try {
      await mutateAsync({
        fullName: values.fullName,
        firstName: values.fullName.split(' ')[0] || '',
        lastName: values.fullName.split(' ')[1] || '',
        email: values.email,
        phone: values.phone,
      });
      toast.success('Account updated successfully');
    } catch (error) {
      form.setError('root', {
        message: getErrorMessage(error),
        type: 'manual',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-wrap gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full items-center justify-between">
          <h2 className="m-0 font-bold text-2xl">Account</h2>
          <div className="mt-4 flex w-full justify-end gap-2">
            <Button
              className="rounded-full"
              onClick={() => form.reset()}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <LoadingButton
              className="rounded-full bg-green-500 hover:bg-green-700"
              isLoading={form.formState.isSubmitting}
              type="submit"
            >
              Save
            </LoadingButton>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage alt={user?.fullName} src={user?.image} />
            <AvatarFallback>
              {(user?.firstName?.charAt(0) ?? '') +
                (user?.lastName?.charAt(0) ?? '')}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-base">Avatar</div>
        </div>
        <div className="grid w-full grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <FormControl>
                  <Input className="h-10 rounded" id="fullName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor="email">Email ID</FormLabel>
                <FormControl>
                  <Input
                    className="h-10 rounded"
                    id="email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <FormControl>
                  <Input className="h-10 rounded" id="phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor="role">Role</FormLabel>
                <Select
                  defaultValue={field.value}
                  disabled
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="h-10 w-full rounded" id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="col-span-2 text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
