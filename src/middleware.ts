import createMiddleware from 'next-intl/middleware';
import {locales, localePrefix} from './navigation';

export default createMiddleware({
    // A list of all locales that are supported
    locales,
    localePrefix,
    // Used when no locale matches
    defaultLocale: 'en',
});

export const config = {
    matcher: "/((?!api|_next/static|_next/image|messages|dictionaries|assets/|icon.ico|favicon.ico).*)",
};
