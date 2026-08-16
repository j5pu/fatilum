"use client"

import Image from "next/image"
import { RiMenu3Line } from 'react-icons/ri'
import { useState } from "react"
import { MotionTransition } from "../MotionTransition/"
import { ContactForm } from "../ContactForm/ContactForm"
import { HostProps } from "@/lib/host";
import {useTranslations, useLocale} from "next-intl";
import { Link, usePathname } from "@/navigation";

export function Header({ icon, info }: { icon: string, info: HostProps, locale?: string }) {
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const [contactFormOpen, setContactFormOpen] = useState(false)
    const t = useTranslations('Home.Header.CallToAction');
    const currentLocale = useLocale();
    const pathname = usePathname();

    const dataCabecera = [
        {
            id: 1,
            name: t("About"),
            idLink: "#about",
        },
        {
            id: 2,
            name: t("Companies"),
            idLink: "#companies",
        },
        {
            id: 3,
            name: t("Contact"),
            idLink: null,
            isContact: true,
        },
        {
            id: 4,
            name: currentLocale === "en" ? "Español" : "English",
            idLink: pathname,
            locale: currentLocale === "en" ? "es" : "en"
        }
    ];

    return (
        <>
            <MotionTransition>
                <nav className="flex flex-wrap items-center justify-between max-w-5xl p-4 mx-auto md:py-8">
                    <Link href="/" className="flex items-center">
                        <Image src={icon} width="150" height="40" alt={info.name + " logo"} />
                    </Link>
                    <RiMenu3Line className="block text-3xl md:hidden cursor-pointer"
                                 onClick={() => setOpenMobileMenu(!openMobileMenu)} />
                    <div className={`${openMobileMenu ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                        <div className="flex flex-col p-4 mt-4 md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            {dataCabecera.map(({ id, name, idLink, locale: linkLocale, isContact }) => (
                                <div key={id} className="px-4 transition-all duration-500 ease-in-out">
                                    {isContact ? (
                                        <button
                                            onClick={() => setContactFormOpen(true)}
                                            className="text-lg hover:text-secondary"
                                        >
                                            {name}
                                        </button>
                                    ) : linkLocale ? (
                                        <Link href={idLink || ''} locale={linkLocale} className="text-lg hover:text-secondary">{name}</Link>
                                    ) : (
                                        <Link href={idLink || ''} className="text-lg hover:text-secondary">{name}</Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </nav>
            </MotionTransition>
            <ContactForm isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />
        </>
    )
}
