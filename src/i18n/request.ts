import { getRequestConfig } from 'next-intl/server';

// Import all messages statically to avoid Turbopack path resolution issues
import en from '../messages/en.json';
import es from '../messages/es.json';

const allMessages = {
  en,
  es,
} as const;

type Locale = keyof typeof allMessages;

export default getRequestConfig(async ({ locale }: { locale?: string }) => {
  const currentLocale = (locale || 'en') as Locale;
  return {
    locale: currentLocale,
    messages: allMessages[currentLocale],
  };
});
