"use client"
import Link from "next/link"
import { BackgroundRadialRight } from "../BackgroundRadialRight"
import { MotionTransition } from "../MotionTransition"
import Image from "next/image"
import { Reveal } from "../Reveal"


export function Somos() {
    const onClick = () => {
        window.location.href = "#buscamos";
    };

    return (
        <div className="relative p-4 md:py-40" id="somos">
            <BackgroundRadialRight />
            <div className="grid max-w-5xl mx-auto md:grid-cols-2">
                <div>
                    <Reveal>
                        <h1 className="text-5xl font-semibold">
                            Asesoramiento en
                            <span className="block degradedBlue bg-blueLight">
                                M&A
                            </span>
                            para empresas
                            <span className="block degradedBlue bg-blueLight">
                                IT
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal>
                        <p className="max-w-md mt-10">Transparencia e innovacion en fusiones y adquisiciones
                            para ayudar al crecimiento de pequeñas y medianas empresas
                            dando mayor claridad sobre el potencial y futuro de la operación.
                            Acceso a Empresas Tecnológicas Compradoras y Private Equity.</p>
                    </Reveal>
                    <Reveal>
                        <div className="my-8">
                            <button onClick={onClick} className="px-4 py-3 rounded-md bg-blueRadial">Buscamos</button>
                        </div>
                    </Reveal>
                </div>
                <MotionTransition className="flex items-center justify-center">
                    <Image src="/assets/Handshake.svg" alt="Card" width={300} height={300} className="h-auto w-72 md:w-full" />
                </MotionTransition>
            </div>
        </div>
    )
}
