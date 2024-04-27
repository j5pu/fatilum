"use client"

import Image from "next/image"
import Link from "next/link"
import { RiMenu3Line } from 'react-icons/ri'
import { useState } from "react"
import { MotionTransition } from "../MotionTransition/"
import { HostProps } from "@/lib/host";
import {useTranslations} from "next-intl";

export function Header({ icon, info, locale }: { icon: string, info: HostProps, locale: string }) {
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const t = useTranslations('Home.Header.CallToAction');
    const About = t("About")
    const Companies = t("Companies")

    const dataCabecera = [
        {
            id: 1,
            name: About,
            idLink: "#" + About.toLowerCase(),
        },
        {
            id: 2,
            name: Companies,
            idLink: "#" + Companies.toLowerCase(),
        },
        {
            id: 3,
            name: t("Contact"),
            idLink: "mailto:jose@mnopi.com",
        },
        {
            id: 4,
            name: locale === "en" ? "Español" : "English",
            idLink: locale === "en" ? "es" : "en"
        }
    ];

    return (
        <MotionTransition>
            <nav className="flex flex-wrap items-center justify-between max-w-5xl p-4 mx-auto md:py-8">
                <Link href="/" className="flex items-center">
                    <Image src={icon} width="150" height="40" alt={info.name + " logo"} />
                </Link>
                <RiMenu3Line className="block text-3xl md:hidden cursor-pointer"
                             onClick={() => setOpenMobileMenu(!openMobileMenu)} />
                <div className={`${openMobileMenu ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                    <div className="flex flex-col p-4 mt-4 md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        {dataCabecera.map(({ id, name, idLink }) => (
                            <div key={id} className="px-4 transition-all duration-500 ease-in-out">
                                <Link href={idLink} className="text-lg hover:text-secondary">{name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </MotionTransition>
    )
}
