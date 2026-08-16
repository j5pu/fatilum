"use client"

import { useState } from "react"
import { RiGlobalLine } from 'react-icons/ri'
import { Link, usePathname } from "@/navigation"
import { useLocale } from "next-intl"

export function LanguageSelector() {
    const [open, setOpen] = useState(false)
    const currentLocale = useLocale()
    const pathname = usePathname()

    const languages = [
        { code: 'en', label: 'EN - English' },
        { code: 'es', label: 'ES - Español' },
    ]

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 text-lg hover:text-secondary transition-colors"
                aria-label="Select language"
            >
                <RiGlobalLine className="text-xl" />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-dark border border-secondary rounded-md shadow-lg z-50">
                    {languages.map(({ code, label }) => (
                        <Link
                            key={code}
                            href={pathname}
                            locale={code}
                            className={`block px-4 py-2 text-sm hover:bg-secondary hover:bg-opacity-10 transition-colors ${
                                currentLocale === code ? 'text-secondary font-semibold' : ''
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
