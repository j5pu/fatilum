import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import React from "react";

const popinsFont = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'] })
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={ChicaGogoFont.className}>{children}</body>
    </html>
  )
}
