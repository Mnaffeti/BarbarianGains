
'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Dumbbell, Brain, Newspaper, Info, MessageSquare } from 'lucide-react';
import BarbarianGainsLogo from '@/components/icons/BarbarianGainsLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from "react";

export default function Header() {
  const pathname = usePathname();
  const [cartItemCount, setCartItemCount] = React.useState(0); // Placeholder

  const navLinksConfig = [
    { href: '/', label: 'Home', icon: Dumbbell },
    { href: '/products', label: 'Products', icon: Dumbbell },
    { href: '/advisor', label: 'AI Advisor', icon: Brain },
    { href: '/blog', label: 'Blog', icon: Newspaper },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BarbarianGainsLogo />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinksConfig.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
              <SheetHeader className="mb-6 text-left">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                   <BarbarianGainsLogo />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4">
                {navLinksConfig.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === link.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
