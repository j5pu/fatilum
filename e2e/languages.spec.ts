import { test, expect } from '@playwright/test';

test.describe('Language Support - All 7 Languages', () => {
  const languages = [
    { code: 'en', name: 'English', label: 'EN - English' },
    { code: 'es', name: 'Español', label: 'ES - Español' },
    { code: 'ee', name: 'Eesti', label: 'EE - Eesti' },
    { code: 'pt', name: 'Português', label: 'PT - Português' },
    { code: 'it', name: 'Italiano', label: 'IT - Italiano' },
    { code: 'fr', name: 'Français', label: 'FR - Français' },
    { code: 'de', name: 'Deutsch', label: 'DE - Deutsch' },
  ];

  languages.forEach(({ code, name, label }) => {
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
      await page.waitForTimeout(300);
      
      // The current language should be highlighted with font-semibold
      // Find the link that contains this language label
      const currentLangLink = page.locator(`a:has-text("${label}")`).first();
      const classes = await currentLangLink.getAttribute('class');
      expect(classes).toContain('font-semibold');
    });
  });
});
