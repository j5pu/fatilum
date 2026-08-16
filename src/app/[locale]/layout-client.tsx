'use client';

import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

interface LayoutClientProps {
  locale: string;
  dir?: string;
  children: React.ReactNode;
  fontClassName: string;
}

export default function LayoutClient({
  locale,
  dir,
  children,
  fontClassName,
}: LayoutClientProps) {
  return (
    <html lang={locale} dir={dir}>
      <NextIntlClientProvider locale={locale}>
        <body className={fontClassName}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
