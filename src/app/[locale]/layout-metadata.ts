import { Metadata } from 'next';

export async function getEnhancedMetadata(
  locale: string,
  info: any,
  intl: any
): Promise<Metadata> {
  const title = `${info.name}: ${intl.formatMessage({ id: 'title' })}`;
  const description = intl.formatMessage({ id: 'description' });
  const url = locale === 'en' ? info.url : info.url + '/es';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: info.name,
    description,
    url,
    inLanguage: locale === 'es' ? 'es-ES' : 'en-US',
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: info.url,
        es: info.url + '/es',
        'x-default': info.url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: info.name,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
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
    inLanguage: locale === 'es' ? 'es-ES' : 'en-US',
  };
}
