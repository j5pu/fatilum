import { locales, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

// noinspection D
/**
 * Parse Accept-Language header and extract language preferences with weights
 * Example: "es-ES,es;q=0.9,en;q=0.8" -> { es: 0.9, en: 0.8 }
 * Note: Explicit q= values override region-specific defaults
 */
export function parseAcceptLanguage(header: string): Record<string, number> {
  const preferences: Record<string, number> = {};
  const isExplicit: Record<string, boolean> = {};

  // noinspection D
  header.split(',').forEach((lang) => {
    const trimmed = lang.trim();
    if (!trimmed) return;

    const parts = trimmed.split(';');
    const code = parts[0].trim();
    const langCode = code.split('-')[0]; // Extract 'en' from 'en-US'
    
    let quality = 1.0;
    let hasExplicitQ = false;
    
    if (parts.length > 1) {
      const qPart = parts[1].trim();
      if (qPart.startsWith('q=')) {
        const parsed = parseFloat(qPart.substring(2));
        if (!isNaN(parsed)) {
          quality = parsed;
          hasExplicitQ = true;
        }
      }
    }

    // Update if first time, or if new value is more explicit, or if same explicitness but higher quality
    const wasPreviouslyExplicit = isExplicit[langCode];
    if (!(langCode in preferences)) {
      preferences[langCode] = quality;
      isExplicit[langCode] = hasExplicitQ;
    } else if (hasExplicitQ && !wasPreviouslyExplicit) {
      // Explicit q= overrides implicit defaults
      preferences[langCode] = quality;
      isExplicit[langCode] = true;
    } else if (hasExplicitQ === wasPreviouslyExplicit && quality > preferences[langCode]) {
      // Same explicitness: prefer higher quality
      preferences[langCode] = quality;
    }
  });

  return preferences;
}

/**
 * Detect user's preferred language from Accept-Language header
 * Returns the highest-preference language from supported locales
 * Falls back to defaultLocale if no match found
 */
export function detectPreferredLanguage(
  acceptLanguageHeader: string | null
): Locale {
  if (!acceptLanguageHeader) {
    return defaultLocale;
  }

  const preferences = parseAcceptLanguage(acceptLanguageHeader);

  // Find the supported locale with highest preference weight
  let bestMatch: Locale = defaultLocale;
  let bestWeight = -1;

  for (const locale of locales) {
    const weight = preferences[locale] ?? -1;
    if (weight > bestWeight) {
      bestWeight = weight;
      bestMatch = locale;
    }
  }

  return bestMatch;
}
