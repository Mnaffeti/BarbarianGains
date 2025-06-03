
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import PageHeader from '@/components/shared/PageHeader';
import { sendPasswordReset } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2, MailCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = form;

  async function onSubmit(data: ForgotPasswordFormValues) {
    setFormError(null);
    setFormSuccess(null);
    try {
      await sendPasswordReset(data.email);
      setFormSuccess("If an account exists for this email, a password reset link has been sent. Please check your inbox (and spam folder).");
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email to reset your password.",
      });
      form.reset();
    } catch (error: any) {
      console.error("Password reset failed:", error);
      // Firebase sendPasswordResetEmail generally doesn't error for non-existent emails for security.
      // It will error for things like malformed email or network issues.
      let errorMessage = "Failed to send password reset email. Please ensure the email is valid and try again.";
      if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is badly formatted.";
      }
      setFormError(errorMessage);
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: errorMessage,
      });
    }
  }

  return (
    <div>
      <PageHeader title="Forgot Password" subtitle="Enter your email to receive a password reset link." />
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Reset Your Password</CardTitle>
              <CardDescription>We'll send a reset link to your email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formError && !formSuccess && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              {formSuccess && (
                <Alert variant="default" className="border-green-500 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <MailCheck className="h-4 w-4 text-green-600 dark:text-green-500" />
                  <AlertTitle>Email Sent</AlertTitle>
                  <AlertDescription>{formSuccess}</AlertDescription>
                </Alert>
              )}
              {!formSuccess && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-2">
             {!formSuccess && (
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              )}
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
