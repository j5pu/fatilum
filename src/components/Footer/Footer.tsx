'use client';

import {Reveal} from "../Reveal";
import {footerSocialNetworks} from "./Footer.data";
import Link from "next/link";
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ContactForm } from "../ContactForm/ContactForm";
import { HostProps } from "@/lib/host";


export function Footer({ icon, info }: { icon: string, info: HostProps }) {
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const locale = useLocale();
    const t = useTranslations('Home');
    const date = new Date();
    const year = date.getFullYear();
    const rights = `© ${year} fatilum OÜ`

    return (
        <>
            <div className="max-w-5xl p-6 mx-auto mt-16 md:mt-20">
                <div className="border-[#3F3E45] border-[1px] my-8"/>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="my-3 flex-1">
                        <Reveal>
                            {rights}
                        </Reveal>
                    </div>

                    <div className="flex gap-6 text-sm text-white">
                        <Link href={`/${locale}/privacy`} className="hover:text-gray-300 transition-colors">
                            {t.raw('Footer.PrivacyPolicy')}
                        </Link>
                        <Link href={`/${locale}/legal`} className="hover:text-gray-300 transition-colors">
                            {t.raw('Footer.LegalNotice')}
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
            <ContactForm isOpen={contactFormOpen} onCloseAction={() => setContactFormOpen(false)} />
        </>
    )
} 
