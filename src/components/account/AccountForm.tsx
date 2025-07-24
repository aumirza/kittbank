import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const accountFormSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.email('Invalid email address'),
  phone: z.string().min(8, 'Phone number is required'),
  role: z.enum(['Super Admin', 'Admin', 'User']),
});

export function AccountForm() {
  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      fullName: 'Filippo Inzaghi',
      email: 'filizanghi@finsight.co',
      phone: '+91-7896523145',
      role: 'Super Admin',
    },
  });

  const onSubmit = (_values: z.infer<typeof accountFormSchema>) => {
    // Handle form submission logic here
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
            <Button
              className="rounded-full bg-green-500 hover:bg-green-700"
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage />
            <AvatarFallback>FI</AvatarFallback>
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
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="h-10 w-full rounded" id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
