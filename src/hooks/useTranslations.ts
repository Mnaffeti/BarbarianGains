'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

interface Translations {
  [key: string]: string;
}

const translationsCache: { [locale: string]: Translations } = {};

export default function useTranslations() {
  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'en'; 

  const [translations, setTranslations] = useState<Translations>(translationsCache[locale] || {});

  useEffect(() => {
    async function loadTranslations(currentLocale: string) {
      if (translationsCache[currentLocale]) {
        setTranslations(translationsCache[currentLocale]);
        return;
      }
      try {
        // Assuming your locales are in public/locales or src/locales and configured for import
        const langModule = await import(`@/locales/${currentLocale}.json`);
        const loadedTranslations = langModule.default || langModule;
        translationsCache[currentLocale] = loadedTranslations;
        setTranslations(loadedTranslations);
      } catch (error) {
        console.error(`Could not load translations for locale: ${currentLocale}`, error);
        if (currentLocale !== 'en') {
          try {
            const langModule = await import(`@/locales/en.json`);
            const fallbackTranslations = langModule.default || langModule;
            translationsCache['en'] = fallbackTranslations;
            setTranslations(fallbackTranslations);
          } catch (fallbackError) {
            console.error('Could not load fallback English translations', fallbackError);
            setTranslations({});
          }
        } else {
          setTranslations({});
        }
      }
    }

    if (locale) {
      loadTranslations(locale);
    }
  }, [locale]);

  const t = useCallback((key: string): string => {
    return translations[key] || key; 
  }, [translations]);

  return { t, currentLocale: locale };
}
