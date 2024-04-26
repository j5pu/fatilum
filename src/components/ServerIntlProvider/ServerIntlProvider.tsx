'use client';

import { IntlProvider } from 'react-intl';

// @ts-ignore
export function ServerIntlProvider({ messages, locale, children }) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      {children}
    </IntlProvider>
  );
}