"use client"
import CountUp from "react-countup";
import { MotionTransition } from "../MotionTransition";
import {useTranslations} from "next-intl";

export function Counter() {
    const t = useTranslations('Home.Counter');

    const dataCounter = [
      {
        id: 1,
        startNumber: 0,
        endNumber: 6,
        text: t("1"),
      },
      {
        id: 2,
        startNumber: 0,
        endNumber: 30,
        text: t("2"),
      },
      {
        id: 3,
        startNumber: 0,
        endNumber: 64,
        text: t("3"),
      },
    ];

    return (
        <MotionTransition className="max-w-5xl py-10 mx-auto md:py-64">
        {/*<MotionTransition className="max-w-5xl p-6 mx-auto  mt-5 md:-mt-5">*/}
            <div className="justify-between md:flex">
                {dataCounter.map(({ id, startNumber, endNumber, text }) => (
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
