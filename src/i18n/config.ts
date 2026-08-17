export const locales = ['en', 'es', 'ee', 'pt', 'it', 'fr', 'de'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];
