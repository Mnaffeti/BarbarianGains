import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/shared/ProductCard';
import { mockProducts } from '@/lib/data';
import { Zap, ShieldCheck, Truck, Users } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);

  const valueProps = [
    {
      icon: Zap,
      title: 'Peak Performance',
      description: 'Unlock your potential with our scientifically formulated supplements.'
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assured',
      description: 'Rigorously tested ingredients for purity and potency you can trust.'
    },
    {
      icon: Truck,
      title: 'Fast & Reliable Shipping',
      description: 'Get your gains delivered quickly to your doorstep.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our team is here to guide you on your fitness journey.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-secondary text-secondary-foreground py-20 md:py-32 rounded-lg overflow-hidden shadow-xl">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1600x900.png"
            alt="Athlete training"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="athlete fitness gym"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-primary">
            Elevate Your Performance
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover premium sports nutrition supplements designed to help you achieve your fitness goals.
            Fuel your ambition with Barbarian Gains.
          </p>
          <Link href="/products">
            <Button size="lg" className="text-lg px-8 py-6">Shop All Products</Button>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products">
            <Button variant="outline" size="lg">View All Products</Button>
          </Link>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-16 bg-card rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Why Choose Barbarian Gains?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop) => (
              <div key={prop.title} className="flex flex-col items-center text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                <prop.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-headline font-semibold mb-2">{prop.title}</h3>
                <p className="text-muted-foreground text-sm">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for AI Advisor */}
      <section className="py-16 bg-secondary rounded-lg shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold mb-6">Not Sure Where to Start?</h2>
          <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
            Let our AI Supplement Advisor help you find the perfect products for your specific goals and needs.
          </p>
          <Link href="/advisor">
            <Button size="lg" variant="default" className="text-lg px-8 py-6">Get Personalized Advice</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
