import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: 'Privacy Policy',
    es: 'Política de Privacidad'
  } as const;

  const descriptions = {
    en: 'Privacy Policy for fatilum OÜ',
    es: 'Política de Privacidad para fatilum OÜ'
  } as const;

  return {
    title: titles[locale as keyof typeof titles] || 'Privacy Policy',
    description: descriptions[locale as keyof typeof descriptions] || 'Privacy Policy for fatilum OÜ',
  };
}

export default function PrivacyPolicy() {
  const t = useTranslations('Privacy');

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">{t('title')}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.introduction.title')}</h2>
            <p className="text-gray-300 leading-relaxed">{t('sections.introduction.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.dataCollection.title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-4">{t('sections.dataCollection.content')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>{t('sections.dataCollection.items.0')}</li>
              <li>{t('sections.dataCollection.items.1')}</li>
              <li>{t('sections.dataCollection.items.2')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.cookies.title')}</h2>
            <p className="text-gray-300 leading-relaxed">{t('sections.cookies.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.userRights.title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-4">{t('sections.userRights.content')}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>{t('sections.userRights.items.0')}</li>
              <li>{t('sections.userRights.items.1')}</li>
              <li>{t('sections.userRights.items.2')}</li>
              <li>{t('sections.userRights.items.3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.contact.title')}</h2>
            <div className="text-gray-300 space-y-2">
              <p><span className="font-semibold text-white">fatilum OÜ</span></p>
              <p>{t('sections.contact.registry')}: 14249878</p>
              <p>{t('sections.contact.vat')}: EE102888722</p>
              <p>{t('sections.contact.address')}: Ahtri tn 12, Tallinn, Estonia</p>
            </div>
          </section>
        </div>

        <p className="text-sm text-gray-400 mt-12">{t('lastUpdated')}</p>
      </div>
    </div>
  );
}
