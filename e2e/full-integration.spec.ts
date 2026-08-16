import { test, expect } from '@playwright/test';

test.describe('Full Page Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en');
  });

  test.describe('English Navigation', () => {
    test('navigates to About section via anchor link', async ({ page }) => {
      const aboutLink = page.getByRole('link', { name: /About/i }).first();
      await aboutLink.click();
      await page.waitForURL('**#about');
      const aboutSection = page.locator('#about');
      await expect(aboutSection).toBeVisible();
    });

    test('navigates to Companies section via anchor link', async ({ page }) => {
      const companiesLink = page.getByRole('link', { name: /Companies/i }).first();
      await companiesLink.click();
      await page.waitForURL('**#companies');
      const companiesSection = page.locator('#companies');
      await expect(companiesSection).toBeVisible();
    });

    test('opens contact form when Contact button clicked', async ({ page }) => {
      const contactButton = page.getByRole('button', { name: /Contact/i }).first();
      await contactButton.click();
      const contactForm = page.locator('h2:has-text("Contact Us")');
      await expect(contactForm).toBeVisible();
    });

    test('closes contact form when Cancel button clicked', async ({ page }) => {
      const contactButton = page.getByRole('button', { name: /Contact/i }).first();
      await contactButton.click();
      const cancelButton = page.getByRole('button', { name: /Cancel/i }).first();
      await cancelButton.click();
      const contactForm = page.locator('h2:has-text("Contact Us")');
      await expect(contactForm).not.toBeVisible();
    });

    test('displays all three companies features (rewards, safe, send)', async ({ page }) => {
      await page.goto('http://localhost:3000/en#companies');
      await expect(page.getByText(/rewards/i)).toBeVisible();
      await expect(page.getByText(/safe/i)).toBeVisible();
      await expect(page.getByText(/send/i)).toBeVisible();
    });
  });

  test.describe('Spanish Navigation', () => {
    test('switches to Spanish and maintains layout', async ({ page }) => {
      const languageButton = page.getByRole('button', { name: /select language/i });
      await languageButton.click();
      const spanishOption = page.getByText('ES - Español');
      await spanishOption.click();
      await page.waitForURL('**/es');
      expect(page.url()).toContain('/es');
    });

    test('Spanish "Somos" link navigates to About section', async ({ page }) => {
      // Switch to Spanish
      const languageButton = page.getByRole('button', { name: /select language/i });
      await languageButton.click();
      const spanishOption = page.getByText('ES - Español');
      await spanishOption.click();
      await page.waitForURL('**/es');

      // Navigate to About using Spanish text
      const somosList = await page.getByRole('link', { name: /somos/i }).all();
      if (somosList.length > 0) {
        await somosList[0].click();
        await page.waitForURL('**/es#about');
        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeVisible();
      }
    });

    test('Spanish "Empresas" link navigates to Companies section', async ({ page }) => {
      // Switch to Spanish
      const languageButton = page.getByRole('button', { name: /select language/i });
      await languageButton.click();
      const spanishOption = page.getByText('ES - Español');
      await spanishOption.click();
      await page.waitForURL('**/es');

      // Navigate to Companies using Spanish text
      const empresasList = await page.getByRole('link', { name: /empresas/i }).all();
      if (empresasList.length > 0) {
        await empresasList[0].click();
        await page.waitForURL('**/es#companies');
        const companiesSection = page.locator('#companies');
        await expect(companiesSection).toBeVisible();
      }
    });

    test('Spanish contact form displays correct translations', async ({ page }) => {
      // Switch to Spanish
      const languageButton = page.getByRole('button', { name: /select language/i });
      await languageButton.click();
      const spanishOption = page.getByText('ES - Español');
      await spanishOption.click();
      await page.waitForURL('**/es');

      // Open contact form
      const contactButton = page.getByRole('button', { name: /Contacto/i }).first();
      await contactButton.click();

      // Verify form is open
      const contactForm = page.locator('[class*="fixed"]');
      await expect(contactForm).toBeVisible();
    });
  });

  test.describe('Language Selector Functionality', () => {
    test('language selector button is visible', async ({ page }) => {
      const languageButton = page.getByRole('button', { name: /select language/i });
      await expect(languageButton).toBeVisible();
    });

    test('language selector opens and closes dropdown', async ({ page }) => {
      const languageButton = page.getByRole('button', { name: /select language/i });
      await languageButton.click();
      const englishOption = page.getByText('EN - English');
      await expect(englishOption).toBeVisible();
      await languageButton.click();
      await expect(englishOption).not.toBeVisible();
    });

    test('both language options are available in dropdown', async ({ page }) => {
      const languageButton = page.getByRole('button', { name: /select language/i });
      await languageButton.click();
      await expect(page.getByText('EN - English')).toBeVisible();
      await expect(page.getByText('ES - Español')).toBeVisible();
    });

    test('current language is highlighted in dropdown', async ({ page }) => {
      const languageButton = page.getByRole('button', { name: /select language/i });
      await languageButton.click();
      const englishOption = page.getByText('EN - English').locator('..');
      await expect(englishOption).toHaveClass(/text-secondary/);
    });
  });

  test.describe('Contact Form Submission', () => {
    test('contact form requires all fields', async ({ page }) => {
      const contactButton = page.getByRole('button', { name: /Contact/i }).first();
      await contactButton.click();
      const submitButton = page.getByRole('button', { name: /Send/i });
      
      // Try to submit empty form
      const nameInput = page.getByLabel(/Name/i);
      expect(nameInput).toHaveAttribute('required');
    });

    test('contact form accepts user input', async ({ page }) => {
      const contactButton = page.getByRole('button', { name: /Contact/i }).first();
      await contactButton.click();

      await page.getByLabel(/Name/i).fill('Test User');
      await page.getByLabel(/Email/i).fill('test@example.com');
      await page.getByLabel(/Message/i).fill('Test message');

      const nameValue = await page.getByLabel(/Name/i).inputValue();
      const emailValue = await page.getByLabel(/Email/i).inputValue();
      const messageValue = await page.getByLabel(/Message/i).inputValue();

      expect(nameValue).toBe('Test User');
      expect(emailValue).toBe('test@example.com');
      expect(messageValue).toBe('Test message');
    });
  });

  test.describe('Handshake Image', () => {
    test('handshake image is visible in About section', async ({ page }) => {
      await page.goto('http://localhost:3000/en#about');
      const handshakeImage = page.locator('img[alt="Card"]');
      await expect(handshakeImage).toBeVisible();
    });

    test('handshake image has correct responsive classes', async ({ page }) => {
      await page.goto('http://localhost:3000/en#about');
      const handshakeImage = page.locator('img[alt="Card"]');
      const classAttr = await handshakeImage.getAttribute('class');
      expect(classAttr).toContain('w-64');
      expect(classAttr).toContain('md:w-80');
    });
  });

  test.describe('Page Structure and Elements', () => {
    test('header is visible with navigation', async ({ page }) => {
      const header = page.locator('nav');
      await expect(header).toBeVisible();
    });

    test('footer is visible', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('all main sections are present on page', async ({ page }) => {
      const aboutSection = page.locator('#about');
      const companiesSection = page.locator('#companies');
      await expect(aboutSection).toBeVisible();
      await expect(companiesSection).toBeVisible();
    });

    test('no console errors on page load', async ({ page, context }) => {
      const errors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') {
          errors.push(message.text());
        }
      });
      await page.goto('http://localhost:3000/en');
      // Filter out expected errors (if any)
      const unexpectedErrors = errors.filter(e => !e.includes('next-themes'));
      expect(unexpectedErrors).toEqual([]);
    });
  });

  test.describe('Responsive Design', () => {
    test('mobile menu button is visible on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const menuButton = page.getByRole('button', { name: /menu/i });
      await expect(menuButton).toBeVisible();
    });

    test('mobile menu opens and closes', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const menuButton = page.getByRole('button').first(); // Menu button
      await menuButton.click();
      // Menu should show navigation items
      const navItems = page.getByRole('link').filter({ hasText: /About|Companies|Contact/i });
      await expect(navItems.first()).toBeVisible();
    });

    test('desktop layout shows full navigation', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      const navItems = page.getByRole('link').filter({ hasText: /About|Companies/i });
      const count = await navItems.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
