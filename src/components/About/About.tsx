"use client"
import { BackgroundRadialRight } from "../BackgroundRadialRight"
import { MotionTransition } from "../MotionTransition"
import Image from "next/image"
import { Reveal } from "../Reveal"
import {useTranslations} from "next-intl";


export async function About() {
    const t = useTranslations('Home.Header.CallToAction');
    const a = useTranslations('Home.About');
    const Companies = t("Companies")
    const Title = a("Title")
    const splitTitle = Title.split(" ")
    const firstWord = splitTitle[0]
    const secondWord = splitTitle[1]
    const restWords = splitTitle.slice(2).join(' ')

    const onClick = () => {
        window.location.href = "#" + Companies.toLowerCase();
    };

    return (
            <div className="relative p-4 md:py-40" id={t("About").toLowerCase()}>
                <BackgroundRadialRight/>
                <div className="grid max-w-5xl mx-auto md:grid-cols-2">
                    <div>
                        <Reveal>
                            <h1 className="text-5xl font-semibold">
                                <span className="block degradedBlue bg-blueLight">
                                    {firstWord}
                                </span>
                                {secondWord}
                                <span className="block degradedBlue bg-blueLight">
                                    {restWords}
                                </span>

                        </h1>
                        </Reveal>
                        <Reveal>
                        <p className="max-w-md mt-10">{a("Description")}</p>
                    </Reveal>
                    <Reveal>
                        <div className="my-8">
                            <button onClick={onClick} className="px-4 py-3 rounded-md bg-blueRadial">{Companies}</button>
                        </div>
                    </Reveal>
                </div>
                <MotionTransition className="flex items-center justify-center">
                    <Image src="/assets/Handshake.svg" alt="Card" width={300} height={300}
                           className="h-auto w-72 md:w-full" />
                </MotionTransition>
            </div>
        </div>
    )
}
