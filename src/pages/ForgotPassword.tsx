import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  useForgotPasswordMutation,
  useForgotVerifyOtpMutation,
} from '@/api/mutations';
import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { getErrorMessage } from '@/utils/getErrorMessage';

const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email'),
  otp: z.string().optional(),
});

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const forgotPasswordMutation = useForgotPasswordMutation();
  const forgotVerifyOtpMutation = useForgotVerifyOtpMutation();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '', otp: '' },
  });

  // Handle sending OTP to email
  const handleSendEmail = async (values: { email: string }) => {
    try {
      await forgotPasswordMutation.mutateAsync({ email: values.email });
      setEmail(values.email);
      setStep(2);
      toast.success('OTP sent to your email address');
    } catch (error) {
      form.setError('email', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async (values: { otp?: string }) => {
    if (!values.otp || values.otp.length < 4) {
      form.setError('otp', { message: 'Please enter a valid 4-digit OTP' });
      return;
    }

    try {
      const result = await forgotVerifyOtpMutation.mutateAsync({
        email,
        otp: values.otp,
      });
      toast.success(
        'OTP verified successfully! You can now reset your password.'
      );
      navigate(`/reset-password/${result.data.data.userId}`);
    } catch (error) {
      form.setError('otp', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Card className="w-full rounded border-0 px-8 py-10">
      <CardContent>
        <div className="mb-8 text-center">
          <div className="mb-2 font-semibold text-2xl tracking-tight">
            Forgot Password
          </div>
          <div className="text-muted-foreground text-sm">
            {step === 1
              ? 'Enter your email to receive an OTP.'
              : 'Enter the OTP sent to your email.'}
          </div>
        </div>
        <Form {...form}>
          {step === 1 ? (
            <form
              className="space-y-6"
              noValidate
              onSubmit={form.handleSubmit(handleSendEmail)}
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
                        autoComplete="email"
                        className="h-10 rounded bg-accent"
                        placeholder="your@email.com"
                        type="email"
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
                isLoading={forgotPasswordMutation.isPending}
                type="submit"
              >
                Send OTP
              </LoadingButton>
            </form>
          ) : (
            <form
              className="space-y-6"
              noValidate
              onSubmit={form.handleSubmit(handleVerifyOtp)}
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only font-medium">OTP</FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP maxLength={4} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3">
                <LoadingButton
                  className="h-10 w-full rounded font-semibold"
                  isLoading={forgotVerifyOtpMutation.isPending}
                  type="submit"
                >
                  Verify OTP
                </LoadingButton>
                <Button
                  className="h-10 w-full rounded font-semibold"
                  onClick={() => setStep(1)}
                  type="button"
                  variant="outline"
                >
                  Go Back
                </Button>
              </div>
            </form>
          )}
        </Form>
      </CardContent>
    </Card>
  );
}
