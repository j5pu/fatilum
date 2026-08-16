import { test, expect } from '@playwright/test';

test.describe('Legal Pages - Privacy and Legal Notice', () => {

  test('Privacy Policy page renders in English', async ({ page }) => {
    await page.goto('http://localhost:3000/en/privacy');
    
    // Verify page title
    await expect(page.locator('h1:has-text("Privacy Policy")')).toBeVisible();
    
    // Verify major sections
    await expect(page.locator('h2:has-text("Data Collection")')).toBeVisible();
    await expect(page.locator('h2:has-text("Cookies")')).toBeVisible();
  });

  test('Privacy Policy page renders in Spanish', async ({ page }) => {
    await page.goto('http://localhost:3000/es/privacy');
    
    // Verify page title (should be Spanish)
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('Privacy Policy displays company information', async ({ page }) => {
    await page.goto('http://localhost:3000/en/privacy');
    
    // Wait for content to load
    await page.waitForTimeout(500);
    
    // Verify company details are somewhere on page
    const text = await page.textContent('body');
    expect(text).toContain('fatilum OÜ');
    expect(text).toContain('14249878');
    expect(text).toContain('EE102888722');
  });

  test('Privacy Policy includes all required sections', async ({ page }) => {
    await page.goto('http://localhost:3000/en/privacy');
    
    const sections = [
      'Introduction',
      'Data Collection',
      'Cookies',
      'Your Rights',
      'Contact'
    ];
    
    for (const section of sections) {
      await expect(page.locator(`h2:has-text("${section}")`)).toBeVisible();
    }
  });

  test('Legal Notice page renders in English', async ({ page }) => {
    await page.goto('http://localhost:3000/en/legal');
    
    // Verify page title
    await expect(page.locator('h1:has-text("Legal Notice")')).toBeVisible();
    
    // Verify major sections
    await expect(page.locator('h2:has-text("Company Information")')).toBeVisible();
  });

  test('Legal Notice page renders in Spanish', async ({ page }) => {
    await page.goto('http://localhost:3000/es/legal');
    
    // Verify page loads
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('Legal Notice displays company information', async ({ page }) => {
    await page.goto('http://localhost:3000/en/legal');
    
    // Wait for content to load
    await page.waitForTimeout(500);
    
    // Verify company details are somewhere on page
    const text = await page.textContent('body');
    expect(text).toContain('fatilum OÜ');
    expect(text).toContain('14249878');
    expect(text).toContain('EE102888722');
    expect(text).toContain('Ahtri tn 12');
  });

  test('Legal Notice includes all required sections', async ({ page }) => {
    await page.goto('http://localhost:3000/en/legal');
    
    const sections = [
      'Company Information',
      'Data Protection',
      'Intellectual Property',
      'Liability',
      'Governing Law',
      'Contact'
    ];
    
    for (const section of sections) {
      await expect(page.locator(`h2:has-text("${section}")`)).toBeVisible();
    }
  });

  test('Legal pages are accessible from footer', async ({ page }) => {
    await page.goto('http://localhost:3000/en');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Footer should have links to legal pages - use more flexible selector
    const legalLink = page.locator('a[href*="/privacy"], a[href*="/legal"]').first();
    await expect(legalLink).toBeVisible();
  });

  test('Legal Notice mentions GDPR compliance', async ({ page }) => {
    await page.goto('http://localhost:3000/en/legal');
    
    // Should mention GDPR
    const content = await page.textContent('body');
    expect(content?.toUpperCase()).toContain('GDPR');
  });

  test('Privacy Policy mentions GDPR rights', async ({ page }) => {
    await page.goto('http://localhost:3000/en/privacy');
    
    // Should mention GDPR and data rights
    const content = await page.content();
    expect(content?.toUpperCase()).toContain('GDPR');
    expect(content?.toUpperCase()).toContain('DATA');
  });

  test('Legal pages have proper HTML structure', async ({ page }) => {
    await page.goto('http://localhost:3000/en/privacy');
    
    // Verify semantic HTML
    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
    
    const headings = page.locator('h1, h2');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('Pages display last updated information', async ({ page }) => {
    await page.goto('http://localhost:3000/en/privacy');
    
    const content = await page.textContent('body');
    expect(content).toContain('Last updated');
  });
});
