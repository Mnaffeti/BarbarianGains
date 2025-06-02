"use client";

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import BarbarianGainsLogo from '@/components/icons/BarbarianGainsLogo';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <BarbarianGainsLogo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium sports nutrition for peak performance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Products</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/advisor" className="text-muted-foreground hover:text-primary">AI Advisor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={24} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter size={24} /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {year !== null ? `© ${year}` : `©`} Barbarian Gains. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
