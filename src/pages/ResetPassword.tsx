import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { z } from 'zod';
import { useResetPasswordMutation } from '@/api/mutations';
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
import { getErrorMessage } from '@/utils/getErrorMessage';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 5 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const { userId } = useParams<{ userId: string }>();
  const { mutateAsync } = useResetPasswordMutation();
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    if (!userId) {
      form.setError('root', {
        type: 'manual',
        message: 'Invalid reset link',
      });
      return;
    }

    try {
      await mutateAsync({
        userId,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      });
      navigate('/login', {
        state: {
          message:
            'Password reset successfully. Please log in with your new password.',
        },
      });
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  }

  return (
    <Card className="rounded border-0 px-8 py-14">
      <CardContent>
        <div className="mb-8">
          <div className="mb-5 font-semibold text-4xl tracking-tight">LOGO</div>
          <div className="font-semibold text-xl">Reset Your Password</div>
          <p className="mt-2 text-muted-foreground text-sm">
            Enter your new password below to reset your account password.
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-6"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className="h-10 rounded bg-accent"
                      placeholder="Enter your new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className="h-10 rounded bg-accent"
                      placeholder="Confirm your new password"
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
              RESET PASSWORD
            </LoadingButton>

            <div className="text-center">
              <Link
                className="font-medium text-primary text-sm hover:underline focus:underline focus:outline-none"
                to="/login"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
