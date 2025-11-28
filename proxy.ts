import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(pt|en|es)/:path*'],
};

