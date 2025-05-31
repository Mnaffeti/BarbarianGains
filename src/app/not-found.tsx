import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/shared/PageHeader'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <AlertTriangle className="mx-auto h-24 w-24 text-destructive mb-8" />
      <PageHeader
        title="404 - Page Not Found"
        subtitle="Oops! The page you're looking for doesn't exist or has been moved."
      />
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        It seems you've taken a wrong turn. Don't worry, it happens to the best of us.
        Let's get you back on track.
      </p>
      <div className="space-x-4">
        <Link href="/">
          <Button size="lg">Go to Homepage</Button>
        </Link>
        <Link href="/products">
          <Button size="lg" variant="outline">Browse Products</Button>
        </Link>
      </div>
    </div>
  )
}
