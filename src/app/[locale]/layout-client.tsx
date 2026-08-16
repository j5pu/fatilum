'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProviderWrapper } from '@/providers/theme-provider';
import { VercelAnalytics } from '@/components/Analytics/Analytics';
import Script from 'next/script';
import React from 'react';

interface LayoutClientProps {
  locale: string;
  dir?: string;
  children: React.ReactNode;
  fontClassName: string;
  messages: any;
  jsonLd?: any;
}

export default function LayoutClient({
  locale,
  dir,
  children,
  fontClassName,
  messages,
  jsonLd,
}: LayoutClientProps) {
  return (
    <html lang={locale} dir={dir}>
      <head>
        {jsonLd && (
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            strategy="beforeInteractive"
          />
        )}
      </head>
      <ThemeProviderWrapper>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body className={fontClassName}>
            {children}
            <VercelAnalytics />
          </body>
        </NextIntlClientProvider>
      </ThemeProviderWrapper>
    </html>
  );
}
