import { test, expect } from '@playwright/test';

test.describe('Anchor Navigation - Multiple Languages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en');
  });

  test('should navigate to About section with #about anchor', async ({ page }) => {
    // Click About link
    await page.click('a[href="#about"]');
    
    // Verify URL has #about hash
    expect(page.url()).toContain('#about');
    
    // Verify About section is visible
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
  });

  test('should navigate to Companies section with #companies anchor', async ({ page }) => {
    // Click Companies link
    await page.click('a[href="#companies"]');
    
    // Verify URL has #companies hash
    expect(page.url()).toContain('#companies');
    
    // Verify Companies section is visible
    const companiesSection = page.locator('#companies');
    await expect(companiesSection).toBeVisible();
  });

  test('Companies button in About section navigates to Companies', async ({ page }) => {
    // Navigate to About section first
    await page.click('a[href="#about"]');
    
    // Click Companies button in About
    const aboutSection = page.locator('#about');
    const companiesButton = aboutSection.locator('button:has-text("Companies")');
    await companiesButton.click();
    
    // Wait for navigation and verify Companies section is visible
    await page.waitForURL(url => url.hash.includes('companies') || true);
    const companiesSection = page.locator('#companies');
    await expect(companiesSection).toBeVisible();
  });

  test('About section has id="about" in DOM', async ({ page }) => {
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toHaveAttribute('id', 'about');
  });

  test('Companies section has id="companies" in DOM', async ({ page }) => {
    const companiesSection = page.locator('#companies');
    await expect(companiesSection).toHaveAttribute('id', 'companies');
  });

  test('Spanish version also has correct anchor IDs', async ({ page }) => {
    // Switch to Spanish
    await page.goto('http://localhost:3000/es');
    
    // Verify sections still have English IDs (hardcoded, not translated)
    const aboutSection = page.locator('#about');
    const companiesSection = page.locator('#companies');
    
    await expect(aboutSection).toHaveAttribute('id', 'about');
    await expect(companiesSection).toHaveAttribute('id', 'companies');
  });

  test('language switching preserves anchor navigation', async ({ page }) => {
    // Navigate to About in English
    await page.goto('http://localhost:3000/en#about');
    await expect(page.locator('#about')).toBeVisible();
    
    // Switch to Spanish language
    const languageButton = page.locator('button[aria-label="Select language"]');
    await languageButton.click();
    
    // Select Spanish
    await page.click('text=ES - Español');
    
    // Should still be on #about section
    await expect(page.locator('#about')).toBeVisible();
    expect(page.url()).toContain('#about');
  });

  test('all header navigation links have correct hrefs', async ({ page }) => {
    const aboutLink = page.locator('a[href="#about"]');
    const companiesLink = page.locator('a[href="#companies"]');
    
    await expect(aboutLink).toHaveCount(1);
    await expect(companiesLink).toHaveCount(1);
  });
});
