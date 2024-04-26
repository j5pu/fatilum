"use client"
import CountUp from "react-countup";
import { MotionTransition } from "../MotionTransition";
import { dataContador } from "./Contador.data";

export function Contador({ locale, dictionary }: { locale: string, dictionary: object }) {
    return (
        <MotionTransition className="max-w-5xl py-10 mx-auto md:py-64">
        {/*<MotionTransition className="max-w-5xl p-6 mx-auto  mt-5 md:-mt-5">*/}
            <div className="justify-between md:flex">
                {dataContador.map(({ id, startNumber, endNumber, text }) => (
                    <div key={id} className="py-5 text-2xl text-center md:text-left">
                        +
                        <CountUp start={startNumber} end={endNumber} duration={1.5} enableScrollSpy />
                        {" "}
                        <span className="degradedBlue bg-blueLight">{text}</span>
                    </div>
                ))}
            </div>
        </MotionTransition>
    )
}
