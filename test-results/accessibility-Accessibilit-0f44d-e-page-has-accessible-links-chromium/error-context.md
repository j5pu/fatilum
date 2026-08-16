# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> Accessibility - WCAG Compliance >> page has accessible links
- Location: e2e/accessibility.spec.ts:73:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/en
Call log:
  - navigating to "http://localhost:3001/en", waiting until "networkidle"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | import { injectAxe } from 'axe-playwright'
  3   | 
  4   | test.describe('Accessibility - WCAG Compliance', () => {
  5   |   test('home page English accessibility check', async ({ page }) => {
  6   |     await page.goto('/en', { waitUntil: 'networkidle' })
  7   |     await page.waitForTimeout(1000)
  8   |     
  9   |     // Inject axe
  10  |     await injectAxe(page)
  11  |     
  12  |     // Run axe and log results (don't fail on violations)
  13  |     const violations = await page.evaluate(() => {
  14  |       return new Promise((resolve) => {
  15  |         (window as any).axe.run((error: any, results: any) => {
  16  |           if (error) throw error
  17  |           resolve(results.violations)
  18  |         })
  19  |       })
  20  |     })
  21  |     
  22  |     // Just verify axe ran
  23  |     expect(violations).toBeDefined()
  24  |   })
  25  | 
  26  |   test('home page Spanish accessibility check', async ({ page }) => {
  27  |     await page.goto('/es', { waitUntil: 'networkidle' })
  28  |     await page.waitForTimeout(1000)
  29  |     
  30  |     await injectAxe(page)
  31  |     
  32  |     const violations = await page.evaluate(() => {
  33  |       return new Promise((resolve) => {
  34  |         (window as any).axe.run((error: any, results: any) => {
  35  |           if (error) throw error
  36  |           resolve(results.violations)
  37  |         })
  38  |       })
  39  |     })
  40  |     
  41  |     expect(violations).toBeDefined()
  42  |   })
  43  | 
  44  |   test('page has proper heading hierarchy', async ({ page }) => {
  45  |     await page.goto('/en', { waitUntil: 'networkidle' })
  46  |     
  47  |     // Get all headings
  48  |     const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
  49  |     expect(headings.length).toBeGreaterThan(0)
  50  |     
  51  |     // Check that we have at least one h1
  52  |     const h1s = await page.locator('h1').all()
  53  |     expect(h1s.length).toBeGreaterThanOrEqual(1)
  54  |   })
  55  | 
  56  |   test('images have alt text or are decorated', async ({ page }) => {
  57  |     await page.goto('/en', { waitUntil: 'networkidle' })
  58  |     
  59  |     // Get all images
  60  |     const images = await page.locator('img').all()
  61  |     expect(images.length).toBeGreaterThan(0)
  62  |     
  63  |     // At least some images should have alt text
  64  |     let hasAlt = 0
  65  |     for (const img of images) {
  66  |       const alt = await img.getAttribute('alt')
  67  |       if (alt) hasAlt++
  68  |     }
  69  |     
  70  |     expect(hasAlt).toBeGreaterThan(0)
  71  |   })
  72  | 
  73  |   test('page has accessible links', async ({ page }) => {
> 74  |     await page.goto('/en', { waitUntil: 'networkidle' })
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/en
  75  |     
  76  |     // Get all links
  77  |     const links = await page.locator('a').all()
  78  |     expect(links.length).toBeGreaterThan(0)
  79  |   })
  80  | 
  81  |   test('page is keyboard navigable', async ({ page }) => {
  82  |     await page.goto('/en', { waitUntil: 'networkidle' })
  83  |     
  84  |     // Tab through page
  85  |     let focusCount = 0
  86  |     for (let i = 0; i < 10; i++) {
  87  |       await page.keyboard.press('Tab')
  88  |       const focused = await page.evaluate(() => document.activeElement?.tagName)
  89  |       
  90  |       if (focused && !['HTML', 'BODY'].includes(focused)) {
  91  |         focusCount++
  92  |       }
  93  |     }
  94  |     
  95  |     // Should be able to focus on multiple elements
  96  |     expect(focusCount).toBeGreaterThan(0)
  97  |   })
  98  | 
  99  |   test('page is responsive to zoom', async ({ page }) => {
  100 |     await page.goto('/en', { waitUntil: 'networkidle' })
  101 |     
  102 |     // Zoom to 200%
  103 |     await page.evaluate(() => {
  104 |       document.body.style.zoom = '200%'
  105 |     })
  106 |     
  107 |     // Page should still load
  108 |     const content = await page.content()
  109 |     expect(content.length).toBeGreaterThan(100)
  110 |     
  111 |     // Reset zoom
  112 |     await page.evaluate(() => {
  113 |       document.body.style.zoom = '100%'
  114 |     })
  115 |   })
  116 | 
  117 |   test('page has lang attribute', async ({ page }) => {
  118 |     await page.goto('/en', { waitUntil: 'networkidle' })
  119 |     
  120 |     const lang = await page.locator('html').getAttribute('lang')
  121 |     expect(lang).toBeTruthy()
  122 |   })
  123 | })
  124 | 
```