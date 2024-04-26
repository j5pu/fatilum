import { Buscamos } from "@/components/Buscamos";
import { Cabecera } from "@/components/Cabecera";
import { Contador } from "@/components/Contador";
import { Pie } from "@/components/Pie";
import { Somos } from "@/components/Somos";
import { getDictionary } from "@/app/dictionaries";

type HomeProps = {
  params: { locale: string };
};

export default async function Home({ params: { locale }}: HomeProps ) {
  const dictionary = await getDictionary(locale)

  return (
    <>
      <Cabecera locale={locale} dictionary={dictionary} />
      <Somos locale={locale} dictionary={dictionary} />
      <Buscamos locale={locale} dictionary={dictionary} />
      <Contador locale={locale} dictionary={dictionary} />
      <Pie locale={locale}/>
    </>
  )
}
