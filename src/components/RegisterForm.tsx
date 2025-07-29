import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { useRegisterMutation } from '@/api/mutations';
import { LoadingButton } from '@/components/LoadingButton';
import { PasswordInput } from '@/components/PasswordInput';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getErrorMessage } from '@/utils/getErrorMessage';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.email(),
  phone: z
    .string()
    .min(10, 'Phone number is required')
    .regex(/^\+?\d{10,15}$/, 'Enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  // biome-ignore lint/suspicious/useAwait: <explanation>
  const onSubmit = async (_values: RegisterFormValues) => {
    try {
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Card className="rounded border-0 px-8 py-14">
      <CardContent>
        <div className="mb-8">
          <div className="mb-5 font-semibold text-4xl tracking-tight">LOGO</div>
          <div className="font-semibold text-xl">Create your account</div>
        </div>
        <Form {...form}>
          <form
            className="space-y-6"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="given-name"
                        className="h-10 rounded bg-accent"
                        placeholder="Hannah"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="family-name"
                        className="h-10 rounded bg-accent"
                        placeholder="Green"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="email"
                        className="h-10 rounded bg-accent"
                        placeholder="hannah.green@test.com"
                        type="email"
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
                  <FormItem>
                    <FormLabel className="font-medium text-sm">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="tel"
                        className="h-10 rounded bg-accent"
                        placeholder="+1234567890"
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className="h-10 rounded bg-accent"
                      placeholder="Password123@"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </div>
            )}
            <LoadingButton
              className="h-10 w-full rounded font-semibold"
              isLoading={form.formState.isSubmitting}
              size="lg"
              type="submit"
            >
              REGISTER
            </LoadingButton>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link
                className="font-medium text-primary hover:underline focus:underline focus:outline-none"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
