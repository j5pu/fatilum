"use client"
import { BackgroundRadialRight } from "../BackgroundRadialRight"
import { MotionTransition } from "../MotionTransition"
import Image from "next/image"
import { Reveal } from "../Reveal"


export async function Somos({ locale, dictionary }: { locale: string, dictionary: any }) {

    const onClick = () => {
        window.location.href = "#" + dictionary["page.home.anchor.target"];
    };

    function Title() {
        switch (locale) {
            case "es":
                return <h1 className="text-5xl font-semibold">
                        Asesoramiento
                        <span className="block degradedBlue bg-blueLight">
                            M&A
                        </span>
                        para empresas
                        <span className="block degradedBlue bg-blueLight">
                            IT
                        </span>
                </h1>
            default:
                return <h1 className="text-5xl font-semibold">
                    <span className="block degradedBlue bg-blueLight">
                            M&A
                        </span>
                    advice for companies
                </h1>
        }
    }

    return (
            <div className="relative p-4 md:py-40" id={dictionary["page.home.anchor.about"]}>
                <BackgroundRadialRight/>
                <div className="grid max-w-5xl mx-auto md:grid-cols-2">
                    <div>
                        <Reveal>
                            {Title()}
                    </Reveal>
                    <Reveal>
                        <p className="max-w-md mt-10">{dictionary["page.home.somos.description"]}</p>
                    </Reveal>
                    <Reveal>
                        <div className="my-8">
                            <button onClick={onClick} className="px-4 py-3 rounded-md bg-blueRadial">{dictionary["page.home.anchor.Target"]}</button>
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
