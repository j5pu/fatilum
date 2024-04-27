import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '../i18n'

export { locales }
// export const locales = ['en', 'es'];
export const localePrefix = 'as-needed'; // Default 'always', 'as-needed' default not used

export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ locales, localePrefix });
