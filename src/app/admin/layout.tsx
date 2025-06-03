
"use client";

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { currentUser, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.replace('/login?redirect=/admin'); // Redirect to login if not authenticated
      } else if (!isAdmin) {
        router.replace('/'); // Redirect to home if authenticated but not admin
      }
    }
  }, [currentUser, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Verifying access...</p>
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
     // This fallback can be shown briefly before redirection, or if redirection fails.
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)] text-center">
        <ShieldAlert className="h-20 w-20 text-destructive mb-6" />
        <PageHeader title="Access Denied" subtitle="You do not have permission to view this page."/>
        <p className="mb-6">Please log in as an administrator or contact support if you believe this is an error.</p>
        <div className="space-x-4">
            <Link href="/">
                <Button variant="outline">Go to Homepage</Button>
            </Link>
            {!currentUser && 
                <Link href="/login?redirect=/admin">
                    <Button>Login</Button>
                </Link>
            }
        </div>
      </div>
    );
  }

  return <div className="py-4">{children}</div>;
}
