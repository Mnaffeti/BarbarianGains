import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <PageHeader
        title="Manage Your Subscriptions"
        subtitle="View and manage your auto-delivery supplement plans."
      />
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader>
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
            <Settings className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Subscriptions Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            We're working hard to bring you a seamless subscription service for your favorite Barbarian Gains products.
            Stay tuned for updates!
          </p>
          <Link href="/products">
            <Button>Explore Products</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
