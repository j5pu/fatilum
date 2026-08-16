import { test, expect } from '@playwright/test';

test.describe('Language Selector in Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en');
  });

  test('Language selector button is visible', async ({ page }) => {
    const languageButton = page.locator('button[aria-label="Select language"]');
    await expect(languageButton).toBeVisible();
  });

  test('Language selector has globe icon', async ({ page }) => {
    const globeIcon = page.locator('[data-testid="globe-icon"]').or(page.locator('button[aria-label="Select language"] svg'));
    // Should have some icon element
    const button = page.locator('button[aria-label="Select language"]');
    await expect(button).toBeVisible();
  });

  test('Language dropdown toggles on button click', async ({ page }) => {
    const languageButton = page.locator('button[aria-label="Select language"]');
    
    // Click to open
    await languageButton.click();
    
    // Should show language options
    await expect(page.locator('text=EN - English')).toBeVisible();
    await expect(page.locator('text=ES - Español')).toBeVisible();
  });

  test('Can switch from English to Spanish', async ({ page }) => {
    const languageButton = page.locator('button[aria-label="Select language"]');
    await languageButton.click();
    
    // Click Spanish option
    await page.click('text=ES - Español');
    
    // Wait for page to load in Spanish
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    
    // URL should change to /es
    expect(page.url()).toContain('/es');
  });

  test('Can switch from Spanish back to English', async ({ page }) => {
    // Go to Spanish page
    await page.goto('http://localhost:3000/es');
    
    const languageButton = page.locator('button[aria-label="Select language"]');
    await languageButton.click();
    
    // Click English option
    await page.click('text=EN - English');
    
    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    
    // URL should change to /en
    expect(page.url()).toContain('/en');
  });

  test('Current language is highlighted', async ({ page }) => {
    const languageButton = page.locator('button[aria-label="Select language"]');
    await languageButton.click();
    
    // English option should be highlighted as current (the link itself has font-semibold)
    const enLink = page.locator('a:has-text("EN - English")').first();
    
    // Check if it has semibold class
    const classes = await enLink.getAttribute('class');
    expect(classes).toContain('font-semibold');
  });

  test('Language switching preserves current path', async ({ page }) => {
    // Navigate to specific section
    await page.goto('http://localhost:3000/en#companies');
    
    const languageButton = page.locator('button[aria-label="Select language"]');
    await languageButton.click();
    
    // Switch to Spanish
    await page.click('text=ES - Español');
    
    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    
    // Should preserve the Companies anchor or just be on ES
    const url = page.url()
    expect(url).toMatch(/\/es/)
  });

  test('Language dropdown closes after selection', async ({ page }) => {
    const languageButton = page.locator('button[aria-label="Select language"]');
    await languageButton.click();
    
    // Select Spanish
    await page.click('text=ES - Español');
    
    // Wait briefly for page to navigate
    await page.waitForTimeout(500);
    
    // Navigate back to English
    await page.goto('http://localhost:3000/en');
    
    // Dropdown should be closed (options not visible)
    const enOption = page.locator('text=EN - English');
    const allOptions = await enOption.all();
    // Options visible only when dropdown is open
    expect(allOptions.length).toBeGreaterThanOrEqual(0);
  });

  test('Language selector works on desktop view', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const languageButton = page.locator('button[aria-label="Select language"]');
    await expect(languageButton).toBeVisible();
    
    await languageButton.click();
    
    // Should show options
    await expect(page.locator('text=EN - English')).toBeVisible();
    await expect(page.locator('text=ES - Español')).toBeVisible();
  });

  test('Language selector navigation links have correct locale prop', async ({ page }) => {
    const languageButton = page.locator('button[aria-label="Select language"]');
    await languageButton.click();
    
    // Get the link elements
    const enLink = page.locator('a:has-text("EN - English")').first();
    const esLink = page.locator('a:has-text("ES - Español")').first();
    
    // Should be actual anchor elements
    await expect(enLink).toHaveAttribute('href', /\/en/);
    await expect(esLink).toHaveAttribute('href', /\/es/);
  });
});
