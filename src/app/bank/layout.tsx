import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import React from "react";

const popinsFont = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bank Website | TarreDev 💸 ',
  description: 'Follow me for more!',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/bank.ico',
        href: '/images/bank.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/bank.ico',
        href: '/images/bank.ico',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={popinsFont.className}>{children}</body>
    </html>
  )
}
