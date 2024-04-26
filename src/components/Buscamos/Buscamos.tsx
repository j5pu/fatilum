"use client"

import { BackgroundRadialLeft } from "../BackgroundRadialLeft"
import { Reveal } from "../Reveal"
import { dataBuscamos } from "./Buscamos.data"
import Image from "next/image"

export function Buscamos({ locale, dictionary }: { locale: string, dictionary: any })
{
    // @ts-ignore
    const onClick = () => {
        window.location.href = "mailto:jose@mnopi.com";
    };

    function Title() {
        switch (locale) {
            case "es":
                return <h1 className="text-5xl font-semibold">
                        Buscamos y acompañamos
                        <span className="block degradedBlue bg-blueLight">
                            empresas
                        </span>
                </h1>
            default:
                return <h1 className="text-5xl font-semibold">
                    <span className="block degradedBlue bg-blueLight">
                            Search and accompany
                        </span>
                    companies
                </h1>
        }
    }

    return (
        <div className="relative px-6 py-20 md:py-64" id={dictionary["page.home.anchor.target"]}>
            <BackgroundRadialLeft />
            <div className="grid max-w-5xl mx-auto md:grid-cols-2">
                <div>
                    <Reveal>
                        <h2 className="text-5xl font-semibold">
                            Buscamos y acompañamos
                            <span className="block degradedBlue bg-blueLight">empresas</span>
                        </h2>
                    </Reveal>
                    <Reveal>
                        <div className="my-8">
                            <button onClick={onClick} className="px-4 py-3 rounded-md bg-blueRadial">Contacta</button>
                        </div>
                    </Reveal>
                </div>

                <div className="grid items-center py-5 md:p-8">
                    {dataBuscamos.map(({ id, icon, title, description }) => (
                        <Reveal key={id}>
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
