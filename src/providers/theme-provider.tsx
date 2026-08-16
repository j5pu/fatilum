'use client'

import { ThemeProvider } from 'next-themes'
import React, { useEffect } from 'react'

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Suppress next-themes script warning in development
    if (typeof window !== 'undefined') {
      const originalError = console.error
      console.error = function (...args: any[]) {
        if (
          args[0]?.includes?.('Encountered a script tag while rendering React component') ||
          args[0]?.message?.includes?.('Encountered a script tag')
        ) {
          return
        }
        originalError.apply(console, args)
      }
      return () => {
        console.error = originalError
      }
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  )
}
