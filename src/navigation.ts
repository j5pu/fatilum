import { createNavigation } from 'next-intl/navigation';

const locales = ['en', 'es'] as const;

export { locales }

export const localePrefix = 'as-needed'; // Default 'always', 'as-needed' default not used

export const { Link, redirect, usePathname, useRouter } =
	createNavigation({ locales, localePrefix, defaultLocale: 'en' });
