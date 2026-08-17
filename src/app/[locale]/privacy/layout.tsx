import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'Privacy Policy',
    es: 'Política de Privacidad',
    ee: 'Privaatsuspoliitika',
    pt: 'Política de Privacidade',
    it: 'Informativa sulla Privacy',
    fr: 'Politique de Confidentialité',
    de: 'Datenschutzrichtlinie'
  } as const;

  const descriptions = {
    en: 'Privacy Policy for fatilum OÜ',
    es: 'Política de Privacidad para fatilum OÜ',
    ee: 'Privaatsuspoliitika fatilum OÜ jaoks',
    pt: 'Política de Privacidade para fatilum OÜ',
    it: 'Informativa sulla Privacy per fatilum OÜ',
    fr: 'Politique de Confidentialité pour fatilum OÜ',
    de: 'Datenschutzrichtlinie für fatilum OÜ'
  } as const;

  return {
    title: titles[locale as keyof typeof titles] || 'Privacy Policy',
    description: descriptions[locale as keyof typeof descriptions] || 'Privacy Policy for fatilum OÜ',
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
