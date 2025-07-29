import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';
import { useLoginMutation } from '@/api/mutations';
import { LoadingButton } from '@/components/LoadingButton';
import { PasswordInput } from '@/components/PasswordInput';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from './ui/card';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { mutateAsync } = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  async function onSubmit(_values: LoginFormValues) {
    try {
      await mutateAsync({
        email: _values.email,
        password: _values.password,
      });
      navigate('/'); // Redirect to dashboard on success
    } catch (error) {
      if (error instanceof Error) {
        form.setError('root', {
          type: 'manual',
          message: error.message,
        });
      }
    }
  }

  return (
    <Card className="rounded border-0 px-8 py-14">
      <CardContent>
        <div className="mb-8">
          <div className="mb-5 font-semibold text-4xl tracking-tight">LOGO</div>
          <div className="font-semibold text-xl">Welcome Back</div>
        </div>
        <Form {...form}>
          <form
            className="space-y-6"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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

            <div className="flex items-center justify-between gap-3">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        aria-label="Remember me on this computer"
                        checked={field.value}
                        id="remember"
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm" htmlFor="remember">
                      Remember me on this computer
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Link
                className="font-medium text-primary text-sm hover:underline focus:underline focus:outline-none"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <LoadingButton
              className="h-10 w-full rounded font-semibold"
              isLoading={form.formState.isSubmitting}
              size="lg"
              type="submit"
            >
              LOG IN
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
