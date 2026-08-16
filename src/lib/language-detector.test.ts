import { parseAcceptLanguage, detectPreferredLanguage } from '@/lib/language-detector';

describe('Language Detector', () => {
  describe('parseAcceptLanguage', () => {
    it('parses single language', () => {
      expect(parseAcceptLanguage('en')).toEqual({ en: 1 });
    });

    it('parses multiple languages with weights', () => {
      const result = parseAcceptLanguage('es-ES,es;q=0.9,en;q=0.8');
      expect(result.es).toBe(0.9);
      expect(result.en).toBe(0.8);
    });

    it('extracts base language code from region', () => {
      const result = parseAcceptLanguage('es-ES');
      expect(result.es).toBe(1);
    });

    it('handles empty string', () => {
      expect(parseAcceptLanguage('')).toEqual({});
    });
  });

  describe('detectPreferredLanguage', () => {
    it('returns default locale when header is null', () => {
      expect(detectPreferredLanguage(null)).toBe('en');
    });

    it('returns default locale when no matching language from supported ones', () => {
      expect(detectPreferredLanguage('ja,zh;q=0.9')).toBe('en');
    });

    it('prefers French when browser prefers French', () => {
      expect(detectPreferredLanguage('fr,de;q=0.9')).toBe('fr');
    });

    it('prefers Spanish when browser prefers Spanish', () => {
      expect(detectPreferredLanguage('es,en;q=0.8')).toBe('es');
    });

    it('prefers English when browser prefers English', () => {
      expect(detectPreferredLanguage('en,es;q=0.8')).toBe('en');
    });

    it('uses weight to determine preference', () => {
      expect(detectPreferredLanguage('en;q=0.5,es;q=0.9')).toBe('es');
    });

    it('handles region-specific codes', () => {
      expect(detectPreferredLanguage('es-ES,en-US;q=0.8')).toBe('es');
    });
  });
});
