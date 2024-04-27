import './globals.css'
import { Metadata, ResolvingMetadata } from "next";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import localFont from 'next/font/local'
import React from "react";
import { getDirection, getIntl } from "@/lib/intl";
import { getHost } from "@/lib/host";

type LayoutProps = {
  params: { locale: string };
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
  parent: ResolvingMetadata
): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);
  const info = getHost()

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


export default function RootLayout({params, children}: LayoutProps) {
  const { locale } = params;
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
