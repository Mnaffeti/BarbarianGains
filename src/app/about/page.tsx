import PageHeader from '@/components/shared/PageHeader';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="About Barbarian Gains"
        subtitle="Fueling Your Ambition with Premium Sports Nutrition"
      />

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-headline font-semibold mb-6">Our Mission</h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            At Barbarian Gains, we are dedicated to providing athletes and fitness enthusiasts with the highest quality sports nutrition supplements. We believe that with the right fuel, dedication, and expert guidance, anyone can achieve their peak performance and transform their physique.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Our formulations are backed by science, crafted with premium ingredients, and manufactured to the strictest quality standards. We're more than just a supplement company; we're your partners in the pursuit of excellence.
          </p>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://placehold.co/800x600.png"
            alt="Swiss Alps landscape"
            layout="fill"
            objectFit="cover"
            data-ai-hint="mountains nature fitness"
          />
        </div>
      </section>

      <section className="py-12 bg-secondary rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-semibold text-center mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={Zap}
              title="Performance"
              description="We engineer products that deliver real results, helping you push boundaries and achieve new personal bests."
            />
            <ValueCard
              icon={Target}
              title="Purity"
              description="Transparency and quality are paramount. We use only the finest, clinically-researched ingredients with no hidden fillers."
            />
            <ValueCard
              icon={Users}
              title="People"
              description="We're committed to our community, providing expert support and fostering a culture of continuous improvement and shared success."
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-semibold text-center mb-10">Meet the (Future) Team</h2>
        <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
          Our team of (future) nutritionists, scientists, and fitness professionals are passionate about helping you succeed. Placeholder for team member bios and photos.
        </p>
        {/* Placeholder for team member cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <Card key={i} className="text-center p-6">
              <Image src={`https://placehold.co/300x300.png`} alt={`Team Member ${i}`} width={150} height={150} className="rounded-full mx-auto mb-4" data-ai-hint="portrait professional person" />
              <h3 className="text-xl font-headline mb-1">Dr. Fictional Expert {i}</h3>
              <p className="text-primary text-sm">Chief Gains Officer</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <Card className="p-6 text-center bg-background">
      <CardContent className="p-0">
        <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-headline font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
