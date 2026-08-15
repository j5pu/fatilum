import './globals.css'
import { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import localFont from 'next/font/local'
import React from "react";
import { getDirection, getIntl } from "@/lib/intl";
import { getHost } from "@/lib/host";

type LayoutProps = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

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

  return {
    title: `${info.name}: ${intl.formatMessage({ id: "title" })}`,
    description: intl.formatMessage({
      id: "description",
    }),
    alternates: {
      canonical: info.url,
      languages: {
        en: info.url,
        es: info.url + "/es",
        "x-default": info.url,
      },
    },
  };
}


export default async function RootLayout({params, children}: LayoutProps) {
  const { locale } = await params;
  const dir = getDirection(locale);
  const messages = useMessages();

  return (
    <html lang={locale} dir={dir}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={ChicaGogoFont.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  )
}
