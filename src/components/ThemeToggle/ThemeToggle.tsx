'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <IoMoon className="w-5 h-5 text-yellow-600" />
      ) : (
        <IoSunny className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  )
}
