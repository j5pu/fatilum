import { Metadata } from 'next';

const localeMap: Record<string, string> = {
  'en': 'en-US',
  'es': 'es-ES',
  'ee': 'et-EE',
  'pt': 'pt-PT',
  'it': 'it-IT',
  'fr': 'fr-FR',
  'de': 'de-DE',
};

const localeNameMap: Record<string, string> = {
  'en': 'en_US',
  'es': 'es_ES',
  'ee': 'et_EE',
  'pt': 'pt_PT',
  'it': 'it_IT',
  'fr': 'fr_FR',
  'de': 'de_DE',
};

export async function getEnhancedMetadata(
  locale: string,
  info: any,
  intl: any
): Promise<Metadata> {
  const title = `${info.name}: ${intl.formatMessage({ id: 'title' })}`;
  const description = intl.formatMessage({ id: 'description' });
  const url = locale === 'en' ? info.url : info.url + '/' + locale;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: info.name,
    description,
    url,
    inLanguage: localeMap[locale] || 'en-US',
  };

  // Build language alternates
  const languages: Record<string, string> = {
    en: info.url,
    es: info.url + '/es',
    ee: info.url + '/ee',
    pt: info.url + '/pt',
    it: info.url + '/it',
    fr: info.url + '/fr',
    de: info.url + '/de',
    'x-default': info.url,
  };

  // Build alternate locales
  const alternateLocales = Object.keys(localeNameMap)
    .filter(l => l !== locale)
    .map(l => localeNameMap[l]);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: info.name,
      locale: localeNameMap[locale] || 'en_US',
      alternateLocale: alternateLocales,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: 'index, follow',
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLd),
    },
  };
}

export function getJsonLd(locale: string, info: any, intl: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: info.name,
    description: intl.formatMessage({ id: 'description' }),
    url: info.url,
    inLanguage: localeMap[locale] || 'en-US',
  };
}
