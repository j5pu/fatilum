import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { detectPreferredLanguage } from '@/lib/language-detector';
import { defaultLocale } from '@/i18n/config';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  
  const preferredLanguage = detectPreferredLanguage(acceptLanguage);
  
  // If preferred language is not default, redirect to it
  // Default language stays at root (/) via URL rewrite
  if (preferredLanguage !== defaultLocale) {
    redirect(`/${preferredLanguage}`);
  }
  
  // For default language, content served via rewrite in next.config
  return null;
}
