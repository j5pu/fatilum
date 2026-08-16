import './globals.css'
import { Metadata } from "next";
import React from "react";
import { getDirection, getIntl } from "@/lib/intl";
import { getHost } from "@/lib/host";
import LayoutClient from "./layout-client";
import { getEnhancedMetadata, getJsonLd } from "./layout-metadata";
import en from '@/messages/en.json';
import es from '@/messages/es.json';

type LayoutProps = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

const messagesByLocale = {
  en,
  es,
} as const;

type Locale = keyof typeof messagesByLocale;

export async function generateMetadata(
  props: any,
): Promise<Metadata> {
  const { locale } = await props.params;
  const intl = await getIntl(locale);
  const info = await getHost()

  return getEnhancedMetadata(locale, info, intl);
}


export default async function RootLayout({params, children}: LayoutProps) {
  const { locale } = await params;
  const dir = getDirection(locale);
  const messages = messagesByLocale[(locale as Locale) || 'en'];
  const intl = await getIntl(locale);
  const info = await getHost();
  const jsonLd = getJsonLd(locale, info, intl);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <title>{info.name}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LayoutClient
          locale={locale}
          messages={messages}
        >
          {children}
        </LayoutClient>
      </body>
    </html>
  )
}
