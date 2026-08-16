import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Check if browser prefers Spanish (es more than en)
  const esWeight = parseInt(acceptLanguage.match(/es(?:;q=([\d.]+))?/)?.[1] || '1');
  const enWeight = parseInt(acceptLanguage.match(/en(?:;q=([\d.]+))?/)?.[1] || '0.9');
  
  if (esWeight > enWeight) {
    redirect('/es');
  }
  
  // For English (default), content served via rewrite in next.config
  return null;
}
