import { getRequestConfig } from 'next-intl/server';

// Import all messages statically to avoid Turbopack path resolution issues
import en from '../messages/en.json';
import es from '../messages/es.json';

const messages = {
  en,
  es,
} as const;

export default getRequestConfig(async ({ locale }: { locale?: string }) => ({
  locale: locale || 'en',
  messages: messages,
}));
