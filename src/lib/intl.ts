import "server-only";

import { createIntl } from "@formatjs/intl";

// @ts-ignore
export async function getIntl(locale) {
  return createIntl({
    locale: locale,
    messages: (await import(`../metadata/${locale}.json`)).default,
  });
}

// @ts-ignore
export function getDirection(locale) {
  switch (locale) {
    case "en":
    case "es":
      return "ltr";
  }
}
