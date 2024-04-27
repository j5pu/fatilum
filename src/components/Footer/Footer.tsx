import {Reveal} from "../Reveal";
import {footerSocialNetworks} from "./Footer.data";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { HostProps } from "@/lib/host";


export function Footer({ icon, info }: { icon: string, info: HostProps }) {
    const t = useTranslations('Home.Footer');
    const date = new Date();
    const year = date.getFullYear();
    const suffix = info.name === "mnopi" ? "inc." : "SRL."
    const rights = `${year} ${info.name} ${suffix} ${t("rights")}`

    return (
        <div className="max-w-5xl p-6 mx-auto mt-10 md:-mt-40">
            <div className="justify-between md:flex">
                <div>
                    <Image src={icon} width={200} height={40} alt={info.name + " logo"}/>
                </div>
            </div>
            <div className="border-[#3F3E45] border-[1px] my-7"/>

            <div className="items-center justify-between md:flex">
                <div className="my-3">
                    <Reveal>
                        {rights}
                    </Reveal>
                </div>
                <div className="flex gap-5">
                    {footerSocialNetworks.map(({id, icon, link}) => (
                        <Link key={id} href={link} className="text-2xl">
                            {icon}
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
} 
