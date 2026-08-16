import './globals.css'
import { Metadata } from "next";
import localFont from 'next/font/local'
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

const ChicaGogoFont = localFont({
  src: [
    {
      path: '../../fonts/ChicaGogoNF-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/ChicaGogoNF-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

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
  const info = await getHost();
  const intl = await getIntl(locale);
  const jsonLd = getJsonLd(locale, info, intl);

  return (
    <LayoutClient
      locale={locale}
      dir={dir}
      fontClassName={ChicaGogoFont.className}
      messages={messages}
      jsonLd={jsonLd}
    >
      {children}
    </LayoutClient>
  )
}
