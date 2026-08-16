import './globals.css'
import { Metadata } from "next";
import React from "react";
import { getDirection, getIntl } from "@/lib/intl";
import { getHost } from "@/lib/host";
import LayoutClient from "./layout-client";
import { getEnhancedMetadata } from "./layout-metadata";
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import ee from '@/messages/ee.json';
import pt from '@/messages/pt.json';
import it from '@/messages/it.json';
import fr from '@/messages/fr.json';
import de from '@/messages/de.json';

type LayoutProps = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

const messagesByLocale = {
  en,
  es,
  ee,
  pt,
  it,
  fr,
  de,
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
  const messages = messagesByLocale[locale as Locale] || messagesByLocale.en;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head />
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
