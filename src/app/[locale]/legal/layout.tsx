import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'Legal Notice',
    es: 'Aviso Legal',
    ee: 'Juriidiline teatis',
    pt: 'Aviso Legal',
    it: 'Avviso Legale',
    fr: 'Avis Juridique',
    de: 'Rechtliche Hinweise'
  } as const;

  const descriptions = {
    en: 'Legal Notice for fatilum OÜ',
    es: 'Aviso Legal para fatilum OÜ',
    ee: 'Juriidiline teatis fatilum OÜ jaoks',
    pt: 'Aviso Legal para fatilum OÜ',
    it: 'Avviso Legale per fatilum OÜ',
    fr: 'Avis Juridique pour fatilum OÜ',
    de: 'Rechtliche Hinweise für fatilum OÜ'
  } as const;

  return {
    title: titles[locale as keyof typeof titles] || 'Legal Notice',
    description: descriptions[locale as keyof typeof descriptions] || 'Legal Notice for fatilum OÜ',
  };
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
