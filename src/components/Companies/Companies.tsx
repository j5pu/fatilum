"use client"

import { BackgroundRadialLeft } from "../BackgroundRadialLeft"
import { Reveal } from "../Reveal"
import Image from "next/image"
import {useTranslations} from "next-intl";
import {CompaniesData} from "@/components/Companies/Companies.types";

export function Companies()
{
    const t = useTranslations('Home.Header.CallToAction');
    const a = useTranslations('Home.Companies');
    const Title = a("Title")
    const splitTitle = Title.split(" ")
    const firstWord = splitTitle[0]
    const restWords = splitTitle.slice(1).join(' ')
    const Data = useTranslations('Home.Companies.Data');

    const items = ["rewards", "safe", "send"]
    let dataCompanies: CompaniesData = items.map(function (e) {
        return {icon: e, title: Data(`${e}.Title`), description: Data(`${e}.Description`)}
    });

    const onClick = () => {
        window.location.href = "mailto:jose@mnopi.com";
    };

    return (
        <div className="relative px-6 py-20 md:py-64" id={t("Companies").toLowerCase()}>
            <BackgroundRadialLeft />
            <div className="grid max-w-5xl mx-auto md:grid-cols-2">
                <div>
                    <Reveal>
                        <h2 className="text-5xl font-semibold">
                            {firstWord}
                            <span className="block degradedBlue bg-blueLight">{restWords}</span>
                        </h2>
                    </Reveal>
                    <Reveal>
                        <div className="my-8">
                            <button onClick={onClick} className="px-4 py-3 rounded-md bg-blueRadial">{t("Contact")}</button>
                        </div>
                    </Reveal>
                </div>

                <div className="grid items-center py-5 md:p-8">
                    {dataCompanies.map(({ icon, title, description }) => (
                        <Reveal key={icon}>
                            <div className="grid grid-flow-col gap-5 px-4 py-2 rounded-3xl group hover:bg-radialBlack">
                                <Image src={`/assets/${icon}.png`} alt={title} width={40} height={40} />
                                <div>
                                    <h4 className="text-primary">{title}</h4>
                                    <p className="text-primaryDark">{description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    )
}
