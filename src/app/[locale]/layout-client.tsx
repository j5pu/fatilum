'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProviderWrapper } from '@/providers/theme-provider';
import { VercelAnalytics } from '@/components/Analytics/Analytics';
import React from 'react';

interface LayoutClientProps {
  locale: string;
  children: React.ReactNode;
  messages: any;
}

export default function LayoutClient({
  locale,
  children,
  messages,
}: LayoutClientProps) {
  return (
    <ThemeProviderWrapper>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        <VercelAnalytics />
      </NextIntlClientProvider>
    </ThemeProviderWrapper>
  );
}
