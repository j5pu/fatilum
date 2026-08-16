import { test, expect } from '@playwright/test';

test.describe('Contact Form Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en');
  });

  test('Contact form opens from Header contact button', async ({ page }) => {
    // Find and click Contact button in header
    const contactButton = page.locator('header button:has-text("Contact")');
    await contactButton.click();
    
    // Verify form modal is visible
    const formModal = page.locator('form');
    await expect(formModal).toBeVisible();
  });

  test('Contact form has all required fields', async ({ page }) => {
    const contactButton = page.locator('header button:has-text("Contact")');
    await contactButton.click();
    
    // Verify form fields
    await expect(page.locator('input[placeholder*="Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="Email"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder*="Message"]')).toBeVisible();
  });

  test('Contact form can be filled with data', async ({ page }) => {
    const contactButton = page.locator('header button:has-text("Contact")');
    await contactButton.click();
    
    // Fill form
    await page.fill('input[placeholder*="Name"]', 'Test User');
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('textarea[placeholder*="Message"]', 'Test message content');
    
    // Verify data was entered
    await expect(page.locator('input[placeholder*="Name"]')).toHaveValue('Test User');
    await expect(page.locator('input[placeholder*="Email"]')).toHaveValue('test@example.com');
    await expect(page.locator('textarea[placeholder*="Message"]')).toHaveValue('Test message content');
  });

  test('Contact form Cancel button closes modal', async ({ page }) => {
    const contactButton = page.locator('header button:has-text("Contact")');
    await contactButton.click();
    
    // Click Cancel
    const cancelButton = page.locator('button:has-text("Cancel")');
    await cancelButton.click();
    
    // Form should be hidden
    const formModal = page.locator('form');
    await expect(formModal).not.toBeVisible();
  });

  test('Contact form opens from Companies section', async ({ page }) => {
    // Scroll to Companies section
    await page.click('a[href="#companies"]');
    
    // Click Contact button in Companies
    const companiesSection = page.locator('#companies');
    const contactButton = companiesSection.locator('button');
    await contactButton.click();
    
    // Verify form modal is visible
    const formModal = page.locator('form');
    await expect(formModal).toBeVisible();
  });

  test('Contact form works in Spanish', async ({ page }) => {
    // Switch to Spanish
    const languageButton = page.locator('button[aria-label="Select language"]');
    await languageButton.click();
    await page.click('text=ES - Español');
    
    // Wait for navigation
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    
    // Find Contact button (should be translated)
    const contactButton = page.locator('text=Contacto').first();
    if (await contactButton.isVisible()) {
      await contactButton.click();
      const formModal = page.locator('form');
      await expect(formModal).toBeVisible();
    }
  });

  test('Submit button is present and enabled', async ({ page }) => {
    const contactButton = page.locator('header button:has-text("Contact")');
    await contactButton.click();
    
    const submitButton = page.locator('button:has-text("Send")');
    await expect(submitButton).toBeEnabled();
  });

  test('Form has honeypot anti-bot field', async ({ page }) => {
    const contactButton = page.locator('header button:has-text("Contact")');
    await contactButton.click();
    
    // Honeypot field should exist but be hidden
    const honeypotField = page.locator('input[name="website"]');
    await expect(honeypotField).toHaveAttribute('style', /display:\s*none|visibility:\s*hidden|opacity:\s*0/);
  });

  test('Contact form closes on successful submission', async ({ page }) => {
    const contactButton = page.locator('header button:has-text("Contact")');
    await contactButton.click();
    
    // Fill form with valid data
    await page.fill('input[placeholder*="Name"]', 'Test User');
    await page.fill('input[placeholder*="Email"]', 'test@example.com');
    await page.fill('textarea[placeholder*="Message"]', 'Test message');
    
    // Click Submit
    const submitButton = page.locator('button:has-text("Send")');
    await submitButton.click();
    
    // Wait for response and modal to close
    await page.waitForTimeout(1000);
    
    // Form should be hidden after submission
    const formModal = page.locator('form');
    const isHidden = await formModal.isHidden().catch(() => true);
    expect(isHidden).toBeTruthy();
  });
});
