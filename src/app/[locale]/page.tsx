import { Companies } from "@/components/Companies";
import { Header } from "@/components/Header";
import { Counter } from "@/components/Counter";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";
import { getHost } from "@/lib/host";

type HomeProps = {
  params: { locale: string };
};

export default async function Home({ params: { locale }}: HomeProps ) {
    const info = getHost()
    const icon = `/assets/${info.name}.png`

  return (
    <>
      <Header icon={icon} info={info}  />
      <About />
      <Companies />
      <Counter />
      <Footer icon={icon} info={info}/>
    </>
  )
}
