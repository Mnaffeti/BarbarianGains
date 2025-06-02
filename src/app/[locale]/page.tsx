// This file replaces the original src/app/page.tsx
// It's now structured for internationalization and uses the useTranslations hook.
'use client'; // This page now uses a hook, so it's a Client Component

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/shared/ProductCard';
import { mockProducts } from '@/lib/data'; // Ensure mockProducts don't need translation for this example
import { Zap, ShieldCheck, Truck, Users } from 'lucide-react';
import useTranslations from '@/hooks/useTranslations'; // Import the hook

export default function HomePage() {
  const { t, currentLocale } = useTranslations(); // Use the hook
  const featuredProducts = mockProducts.slice(0, 4);

  const valueProps = [
    {
      icon: Zap,
      titleKey: 'valuePropPerformanceTitle',
      descriptionKey: 'valuePropPerformanceDesc'
    },
    {
      icon: ShieldCheck,
      titleKey: 'valuePropQualityTitle',
      descriptionKey: 'valuePropQualityDesc'
    },
    {
      icon: Truck,
      titleKey: 'valuePropShippingTitle',
      descriptionKey: 'valuePropShippingDesc'
    },
    {
      icon: Users,
      titleKey: 'valuePropSupportTitle',
      descriptionKey: 'valuePropSupportDesc'
    }
  ];

  const getLocalizedPath = (path: string) => {
    if (path === '/') return `/${currentLocale}`;
    return `/${currentLocale}${path}`;
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground py-20 md:py-32 rounded-lg overflow-hidden shadow-xl">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1600x900.png"
            alt="Athlete training"
            fill // Use fill instead of layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes
            style={{objectFit: 'cover'}} // Use style for objectFit
            className="opacity-20"
            data-ai-hint="athlete fitness gym"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-primary">
            {t('heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <Link href={getLocalizedPath('/products')}>
            <Button size="lg" className="text-lg px-8 py-6">{t('shopAllProducts')}</Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-10">{t('featuredProducts')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={getLocalizedPath('/products')}>
            <Button variant="outline" size="lg">{t('viewAllProducts')}</Button>
          </Link>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-16 bg-card rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">{t('whyChoose')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop) => (
              <div key={prop.titleKey} className="flex flex-col items-center text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <prop.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-headline font-semibold mb-2">{t(prop.titleKey)}</h3>
                <p className="text-muted-foreground text-sm">{t(prop.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for AI Advisor */}
      <section className="py-16 bg-secondary rounded-lg shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold mb-6">{t('aiAdvisorTitle')}</h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
            {t('aiAdvisorDesc')}
          </p>
          <Link href={getLocalizedPath('/advisor')}>
            <Button size="lg" variant="default" className="text-lg px-8 py-6">{t('getPersonalizedAdvice')}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
