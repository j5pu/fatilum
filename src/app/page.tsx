import { Buscamos } from "@/components/Buscamos";
import { Cabecera } from "@/components/Cabecera";
import { Contador } from "@/components/Contador";
import { Pie } from "@/components/Pie";
import { Somos } from "@/components/Somos";

export default function Home() {
  return (
    <>
      <Cabecera />
      <Somos />
      <Buscamos />
      <Contador />
      <Pie />
    </>
  )
}
