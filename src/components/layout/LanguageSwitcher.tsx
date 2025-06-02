'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
// Directly use the locales defined in next.config.js if possible, or hardcode them.
// For simplicity here, they are hardcoded but should match next.config.js
const supportedLocales = ['en', 'fr'];
const defaultLocale = 'en';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const pathLocale = pathname.split('/')[1];
  const currentLocale = supportedLocales.includes(pathLocale) ? pathLocale : defaultLocale;

  const changeLocale = (newLocale: string) => {
    let newPathname = pathname;
    if (supportedLocales.includes(pathLocale)) {
      newPathname = pathname.replace(`/${pathLocale}`, `/${newLocale}`);
    } else {
      // Pathname does not have a locale, prepend new locale
      // This case might occur if middleware isn't perfectly catching all non-prefixed paths
      newPathname = `/${newLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
    }
    // Ensure home path is correct, e.g. /en or /fr, not /en/ or /fr/
    if (newPathname === `/${newLocale}/`) newPathname = `/${newLocale}`;


    router.push(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLocales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLocale(locale)}
            disabled={locale === currentLocale}
            className={locale === currentLocale ? 'font-semibold bg-accent text-accent-foreground' : ''}
          >
            {locale === 'en' ? 'English' : ''}
            {locale === 'fr' ? 'Français' : ''}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
