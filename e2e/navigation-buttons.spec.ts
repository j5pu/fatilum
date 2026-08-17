import { test, expect } from '@playwright/test';

test.describe('Navigation Buttons - All Languages', () => {
  const languages = [
    { code: 'en', companiesLabel: 'Companies' },
    { code: 'es', companiesLabel: 'Empresas' },
    { code: 'ee', companiesLabel: 'Ettevõtted' },
    { code: 'pt', companiesLabel: 'Empresas' },
    { code: 'it', companiesLabel: 'Aziende' },
    { code: 'fr', companiesLabel: 'Entreprises' },
    { code: 'de', companiesLabel: 'Unternehmen' },
  ];

  languages.forEach(({ code, companiesLabel }) => {
    test(`Companies button scrolls to section in ${code}`, async ({ page }) => {
      const url = code === 'en' ? 'http://localhost:3000/en' : `http://localhost:3000/${code}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Find and click the Companies button in the About section
      const companiesButton = page.locator(`button:has-text("${companiesLabel}")`).first();
      await expect(companiesButton).toBeVisible();
      
      // Get initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);
      
      // Click the button
      await companiesButton.click();
      await page.waitForTimeout(1000); // Wait for smooth scroll
      
      // Check that we scrolled down
      const finalScroll = await page.evaluate(() => window.scrollY);
      expect(finalScroll).toBeGreaterThan(initialScroll + 100);
      
      // Verify the companies section is in view
      const companiesSection = page.locator('#companies');
      await expect(companiesSection).toBeInViewport();
    });

    test(`Header Companies link navigates in ${code}`, async ({ page }) => {
      const url = code === 'en' ? 'http://localhost:3000/en' : `http://localhost:3000/${code}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Find Companies link in header
      const headerLink = page.locator(`a[href="#companies"]`);
      await expect(headerLink).toBeVisible();
      
      // Get initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);
      
      // Click the header link
      await headerLink.click();
      await page.waitForTimeout(500);
      
      // Check that we scrolled down
      const finalScroll = await page.evaluate(() => window.scrollY);
      expect(finalScroll).toBeGreaterThan(initialScroll + 100);
      
      // Verify the companies section is in view
      const companiesSection = page.locator('#companies');
      await expect(companiesSection).toBeInViewport();
    });

    test(`About section exists with correct id in ${code}`, async ({ page }) => {
      const url = code === 'en' ? 'http://localhost:3000/en' : `http://localhost:3000/${code}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      
      const aboutSection = page.locator('#about');
      await expect(aboutSection).toBeVisible();
    });

    test(`Companies section exists with correct id in ${code}`, async ({ page }) => {
      const url = code === 'en' ? 'http://localhost:3000/en' : `http://localhost:3000/${code}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      
      const companiesSection = page.locator('#companies');
      await expect(companiesSection).toBeVisible();
    });
  });
});
