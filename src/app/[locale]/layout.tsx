import './globals.css'
import { Metadata, ResolvingMetadata } from "next";
import localFont from 'next/font/local'
import React from "react";
import { getDirection, getIntl } from "@/lib/intl";
import { headers } from 'next/headers';

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

const ChicaGogoFont = localFont({
  src: [
    {
      path: './ChicaGogoNF-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ChicaGogoNF-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

type RouteProps = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  props: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const intl = await getIntl(props.params.locale);
  const headersList = headers();
  let url = "https://" + headersList.get('host');

  return {
    title: intl.formatMessage({ id: "page.home.title" }),
    description: intl.formatMessage({
      id: "page.home.description",
    }),
    alternates: {
      canonical: url,
      languages: {
        en: url,
        es: url + "/es",
        "x-default": url,
      },
    },
  };
}


export default function RootLayout({params, children}: LayoutProps) {
  const { locale } = params;
  const dir = getDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body className={ChicaGogoFont.className}>{children}</body>
    </html>
  )
}
