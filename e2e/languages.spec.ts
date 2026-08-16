import { test, expect } from '@playwright/test';

test.describe('Language Support - All 7 Languages', () => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ee', name: 'Eesti' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  languages.forEach(({ code, name }) => {
    test(`Page loads in ${name} (${code})`, async ({ page }) => {
      const url = code === 'en' ? 'http://localhost:3000/en' : `http://localhost:3000/${code}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Page should load without errors
      const title = await page.title();
      expect(title).toBeTruthy();
      
      // Language selector should be visible
      const langButton = page.locator('button[aria-label="Select language"]');
      await expect(langButton).toBeVisible();
    });

    test(`Language selector shows ${name} as active`, async ({ page }) => {
      const url = code === 'en' ? 'http://localhost:3000/en' : `http://localhost:3000/${code}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      
      const langButton = page.locator('button[aria-label="Select language"]');
      await langButton.click();
      
      // The current language should be highlighted
      const currentLangLink = page.locator(`a:has-text("${code.toUpperCase()}")`).first();
      const classes = await currentLangLink.getAttribute('class');
      expect(classes).toContain('font-semibold');
    });
  });
});
