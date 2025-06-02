'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Dumbbell, Brain, Newspaper, Info, MessageSquare } from 'lucide-react';
import BarbarianGainsLogo from '@/components/icons/BarbarianGainsLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from "react";
import LanguageSwitcher from './LanguageSwitcher';
import useTranslations from '@/hooks/useTranslations';

export default function Header() {
  const pathname = usePathname();
  const [cartItemCount, setCartItemCount] = React.useState(0); // Placeholder
  const { t, currentLocale } = useTranslations();

  const navLinksConfig = [
    { href: '/', labelKey: 'navHome', icon: Dumbbell },
    { href: '/products', labelKey: 'navProducts', icon: Dumbbell },
    { href: '/advisor', labelKey: 'navAIAdvisor', icon: Brain },
    { href: '/blog', labelKey: 'navBlog', icon: Newspaper },
    { href: '/about', labelKey: 'navAboutUs', icon: Info },
    { href: '/contact', labelKey: 'navContact', icon: MessageSquare },
  ];

  const getLocalizedPath = (path: string) => {
    if (path === '/') return `/${currentLocale}`;
    return `/${currentLocale}${path}`;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={getLocalizedPath('/')} className="flex items-center gap-2">
          <BarbarianGainsLogo />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinksConfig.map((link) => {
            const localizedHref = getLocalizedPath(link.href);
            return (
              <Link
                key={link.href}
                href={localizedHref}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === localizedHref ? "text-primary" : "text-foreground/60"
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <Link href={getLocalizedPath('/cart')}>
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
              <div className="mb-6">
                <Link href={getLocalizedPath('/')} className="flex items-center gap-2">
                 <BarbarianGainsLogo />
                </Link>
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinksConfig.map((link) => {
                  const localizedHref = getLocalizedPath(link.href);
                  return (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={localizedHref}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === localizedHref ? "bg-accent text-accent-foreground" : "text-foreground/80"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {t(link.labelKey)}
                    </Link>
                  </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
