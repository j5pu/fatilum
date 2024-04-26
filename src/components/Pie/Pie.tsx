import { Reveal } from "../Reveal";
import { pieSocialNetworks } from "./Pie.data";
import Link from "next/link";
import Image from "next/image";
import { getIntl } from "@/lib/intl";


export async function Pie({ locale }: { locale: string }) {
    const intl = await getIntl(locale);

    return (
        <div className="max-w-5xl p-6 mx-auto mt-10 md:-mt-40">
            <div className="justify-between md:flex">
                <div>
                    <Image src="/assets/mnopi.png" width={200} height={40} alt="mnopi Logo"/>
                </div>
            </div>
            <div className="border-[#3F3E45] border-[1px] my-7"/>

            <div className="items-center justify-between md:flex">
                <div className="my-3">
                    <Reveal>
                        {intl.formatMessage({ id: "page.home.pie.allrights" })}
                    </Reveal>
                </div>
                <div className="flex gap-5">
                    {pieSocialNetworks.map(({id, icon, link}) => (
                        <Link key={id} href={link} className="text-2xl">
                            {icon}
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
} 
