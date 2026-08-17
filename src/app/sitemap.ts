import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fatilum.vercel.app';
  const locales = ['en', 'es', 'ee', 'pt', 'it', 'fr', 'de'];
  
  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: 'privacy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: 'legal', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url = locale === 'en' 
        ? `${baseUrl}${page.path ? `/${page.path}` : ''}`
        : `${baseUrl}/${locale}${page.path ? `/${page.path}` : ''}`;
      
      routes.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    });
  });

  return routes;
}
