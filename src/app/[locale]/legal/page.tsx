import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { getIntl } from '@/lib/intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const intl = await getIntl(locale);

  return {
    title: intl.formatMessage({ id: 'Legal.title' }),
    description: intl.formatMessage({ id: 'Legal.description' }),
  };
}

export default function LegalNotice() {
  const t = useTranslations('Legal');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-16 px-4 md:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">{t('title')}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.company.title')}</h2>
            <div className="text-gray-300 space-y-2">
              <p><span className="font-semibold text-white">fatilum OÜ</span></p>
              <p>{t('sections.company.registry')}: 14249878</p>
              <p>{t('sections.company.vat')}: EE102888722</p>
              <p>{t('sections.company.address')}: Ahtri tn 12, Tallinn, Estonia</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.dataProtection.title')}</h2>
            <p className="text-gray-300 leading-relaxed">{t('sections.dataProtection.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.intellectualProperty.title')}</h2>
            <p className="text-gray-300 leading-relaxed">{t('sections.intellectualProperty.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.liability.title')}</h2>
            <p className="text-gray-300 leading-relaxed">{t('sections.liability.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.governing.title')}</h2>
            <p className="text-gray-300 leading-relaxed">{t('sections.governing.content')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('sections.contact.title')}</h2>
            <p className="text-gray-300">{t('sections.contact.text')}</p>
            <p className="text-gray-300 mt-2">
              <a href="mailto:jose@mnopi.com" className="text-blue-400 hover:text-blue-300">jose@mnopi.com</a>
            </p>
          </section>
        </div>

        <p className="text-sm text-gray-400 mt-12">{t('lastUpdated')}</p>
      </div>
    </div>
  );
}
