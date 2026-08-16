'use client';

import {Reveal} from "../Reveal";
import {footerSocialNetworks} from "./Footer.data";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { ContactForm } from "../ContactForm/ContactForm";
import { HostProps } from "@/lib/host";


export function Footer({ icon, info }: { icon: string, info: HostProps }) {
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const t = useTranslations('Home.Footer');
    const locale = useLocale();
    const date = new Date();
    const year = date.getFullYear();
    const rights = `${year} fatilum OÜ ${t("rights")}`

    return (
        <>
            <div className="max-w-5xl p-6 mx-auto mt-10 md:-mt-40">
                <div className="justify-between md:flex">
                    <div>
                        <Image src={icon} width={200} height={40} alt={info.name + " logo"}/>
                    </div>
                </div>
                <div className="border-[#3F3E45] border-[1px] my-7"/>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="my-3 flex-1">
                        <Reveal>
                            {rights}
                        </Reveal>
                    </div>

                    <div className="flex gap-6 text-sm text-white">
                        <Link href={`/${locale}/privacy`} className="hover:text-gray-300 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href={`/${locale}/legal`} className="hover:text-gray-300 transition-colors">
                            Legal Notice
                        </Link>
                    </div>

                    <div className="flex gap-5 flex-1 justify-end">
                        {footerSocialNetworks.map(({id, icon, link}) => {
                            if (link === "mailto:jose@mnopi.com") {
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setContactFormOpen(true)}
                                        className="text-2xl hover:text-gray-300 transition-colors cursor-pointer"
                                    >
                                        {icon}
                                    </button>
                                );
                            }
                            return (
                                <Link key={id} href={link} className="text-2xl">
                                    {icon}
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
            <ContactForm isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />
        </>
    )
} 
