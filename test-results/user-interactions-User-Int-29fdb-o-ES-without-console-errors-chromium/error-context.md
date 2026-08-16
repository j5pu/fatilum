# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-interactions.spec.ts >> User Interactions - Critical Flows >> language switching EN to ES without console errors
- Location: e2e/user-interactions.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/
Call log:
  - navigating to "http://localhost:3001/", waiting until "networkidle"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test.describe('User Interactions - Critical Flows', () => {
  4   |   test('language switching EN to ES without console errors', async ({ page }) => {
  5   |     const consoleErrors: string[] = []
  6   |     
  7   |     page.on('console', msg => {
  8   |       if (msg.type() === 'error') {
  9   |         consoleErrors.push(msg.text())
  10  |       }
  11  |     })
  12  |     
> 13  |     await page.goto('/', { waitUntil: 'networkidle' })
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/
  14  |     
  15  |     // Find and click language selector
  16  |     const languageSelector = page.locator('[data-testid="language-selector"], button:has-text("Español"), button:has-text("English")')
  17  |     
  18  |     if (await languageSelector.isVisible()) {
  19  |       await languageSelector.click()
  20  |       await page.waitForTimeout(500)
  21  |     }
  22  |     
  23  |     // Verify page content changes or URL changes
  24  |     await page.waitForTimeout(1000)
  25  |     const finalUrl = page.url()
  26  |     
  27  |     // Should either be on /es or have Spanish content
  28  |     expect(finalUrl).toMatch(/\/(es)?/)
  29  |     
  30  |     // Verify no hydration errors in console
  31  |     const hydrationErrors = consoleErrors.filter(msg => 
  32  |       msg.includes('hydration') || 
  33  |       msg.includes('Cannot render a sync or defer <script>')
  34  |     )
  35  |     expect(hydrationErrors).toHaveLength(0)
  36  |   })
  37  | 
  38  |   test('language switching ES to EN without console errors', async ({ page }) => {
  39  |     const consoleErrors: string[] = []
  40  |     
  41  |     page.on('console', msg => {
  42  |       if (msg.type() === 'error') {
  43  |         consoleErrors.push(msg.text())
  44  |       }
  45  |     })
  46  |     
  47  |     await page.goto('/es', { waitUntil: 'networkidle' })
  48  |     
  49  |     // Find and click language selector
  50  |     const languageSelector = page.locator('[data-testid="language-selector"], button:has-text("Español"), button:has-text("English")')
  51  |     
  52  |     if (await languageSelector.isVisible()) {
  53  |       await languageSelector.click()
  54  |       await page.waitForTimeout(500)
  55  |     }
  56  |     
  57  |     // Verify page loads
  58  |     await page.waitForTimeout(1000)
  59  |     const finalUrl = page.url()
  60  |     expect(finalUrl).toMatch(/^https?:\/\//)
  61  |     
  62  |     // Verify no hydration errors
  63  |     const hydrationErrors = consoleErrors.filter(msg => 
  64  |       msg.includes('hydration') || 
  65  |       msg.includes('Cannot render a sync or defer <script>')
  66  |     )
  67  |     expect(hydrationErrors).toHaveLength(0)
  68  |   })
  69  | 
  70  |   test('dark mode toggle works without errors', async ({ page }) => {
  71  |     const consoleErrors: string[] = []
  72  |     
  73  |     page.on('console', msg => {
  74  |       if (msg.type() === 'error') {
  75  |         consoleErrors.push(msg.text())
  76  |       }
  77  |     })
  78  |     
  79  |     await page.goto('/', { waitUntil: 'networkidle' })
  80  |     
  81  |     // Find theme toggle button
  82  |     const themeToggle = page.locator('[data-testid="theme-toggle"], button:has-text("☀"), button:has-text("🌙")')
  83  |     
  84  |     if (await themeToggle.isVisible()) {
  85  |       // Click to toggle dark mode
  86  |       await themeToggle.click()
  87  |       await page.waitForTimeout(500)
  88  |       
  89  |       // Check that html tag has theme attributes
  90  |       const htmlElement = page.locator('html')
  91  |       const className = await htmlElement.getAttribute('class')
  92  |       expect(className).toBeTruthy()
  93  |       
  94  |       // Click again to toggle back
  95  |       await themeToggle.click()
  96  |       await page.waitForTimeout(500)
  97  |     }
  98  |     
  99  |     // Verify no errors
  100 |     expect(consoleErrors).toHaveLength(0)
  101 |   })
  102 | 
  103 |   test('page has no hydration warnings on initial load', async ({ page }) => {
  104 |     const consoleMessages: string[] = []
  105 |     
  106 |     page.on('console', msg => {
  107 |       consoleMessages.push(msg.text())
  108 |     })
  109 |     
  110 |     await page.goto('/es', { waitUntil: 'networkidle' })
  111 |     await page.waitForTimeout(1000)
  112 |     
  113 |     // Filter for hydration-related messages
```