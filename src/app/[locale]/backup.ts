import './globals.css'
import { Metadata, ResolvingMetadata } from "next";
import localFont from 'next/font/local'
import React from "react";
import { getDirection, getIntl } from "@/lib/intl";

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

export const metadata: Metadata = {
  title: 'mnopi: IT M&A',
  description: 'Asesoramiento en M&A para IT',
}
//
// type RouteProps = {
//   params: { locale: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };
//
// export async function generateMetadata(
//   props: RouteProps,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const intl = await getIntl(props.params.locale);
//
//   return {
//     title: intl.formatMessage({ id: "page.home.title" }),
//     description: intl.formatMessage({
//       id: "page.home.description",
//     }),
//     alternates: {
//       canonical: "https://example.com",
//       languages: {
//         ar: "http://example.com/ar",
//         en: "http://example.com",
//         fr: "http://example.com/fr",
//         "nl-NL": "http://example.com/nl-NL",
//         "x-default": "http://example.com",
//       },
//     },
//   };
// }


export default function RootLayout({params, children}: LayoutProps) {
  const { locale } = params;
  const dir = getDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body className={ChicaGogoFont.className}>{children}</body>
    </html>
  )
}
