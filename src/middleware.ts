import { NextRequest, NextResponse } from 'next/server';

// These should match the locales in next.config.js
const locales = ['en', 'fr'];
const defaultLocale = 'en';

const PUBLIC_FILE = /\.(.*)$/; // Matches files with extensions like .jpg, .css, .js

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a static file or API route, if so, skip
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') || // Internal Next.js paths
    pathname === '/favicon.ico' // Specific public files
  ) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const url = request.nextUrl.clone();
    // Prepend the default locale to the pathname
    url.pathname = `/${defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
