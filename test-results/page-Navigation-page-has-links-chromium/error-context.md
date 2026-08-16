# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: page.spec.ts >> Navigation >> page has links
- Location: e2e/page.spec.ts:84:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/en
Call log:
  - navigating to "http://localhost:3001/en", waiting until "networkidle"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test.describe('Home Page - English', () => {
  4   |   test('loads homepage', async ({ page }) => {
  5   |     await page.goto('/en', { waitUntil: 'networkidle' })
  6   |     
  7   |     // Check page loads successfully (may redirect to /)
  8   |     expect(page.url()).toMatch(/\/(en)?$/)
  9   |   })
  10  | 
  11  |   test('page contains content', async ({ page }) => {
  12  |     await page.goto('/en', { waitUntil: 'networkidle' })
  13  |     
  14  |     // Wait for content to load
  15  |     await page.waitForTimeout(1000)
  16  |     
  17  |     // Check for main content
  18  |     const content = await page.content()
  19  |     expect(content).toContain('About')
  20  |     expect(content).toContain('Companies')
  21  |   })
  22  | 
  23  |   test('has correct page title', async ({ page }) => {
  24  |     await page.goto('/en', { waitUntil: 'networkidle' })
  25  |     
  26  |     await expect(page).toHaveTitle(/mnopi/)
  27  |   })
  28  | 
  29  |   test('displays meta description', async ({ page }) => {
  30  |     await page.goto('/en', { waitUntil: 'networkidle' })
  31  |     
  32  |     const description = await page.locator('meta[name="description"]').getAttribute('content')
  33  |     expect(description).toContain('M&A')
  34  |   })
  35  | 
  36  |   test('has canonical link', async ({ page }) => {
  37  |     await page.goto('/en', { waitUntil: 'networkidle' })
  38  |     
  39  |     const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  40  |     expect(canonical).toBeTruthy()
  41  |   })
  42  | 
  43  |   test('has language alternate links', async ({ page }) => {
  44  |     await page.goto('/en', { waitUntil: 'networkidle' })
  45  |     
  46  |     const enAlternate = await page.locator('link[rel="alternate"][hrefLang="en"]').getAttribute('href')
  47  |     const esAlternate = await page.locator('link[rel="alternate"][hrefLang="es"]').getAttribute('href')
  48  |     
  49  |     expect(enAlternate).toBeTruthy()
  50  |     expect(esAlternate).toBeTruthy()
  51  |   })
  52  | })
  53  | 
  54  | test.describe('Home Page - Spanish', () => {
  55  |   test('loads Spanish homepage', async ({ page }) => {
  56  |     await page.goto('/es', { waitUntil: 'networkidle' })
  57  |     
  58  |     expect(page.url()).toMatch(/\/(es)?$/)
  59  |   })
  60  | 
  61  |   test('renders content in Spanish', async ({ page }) => {
  62  |     await page.goto('/es', { waitUntil: 'networkidle' })
  63  |     
  64  |     await page.waitForTimeout(1000)
  65  |     
  66  |     // Check content loads
  67  |     const content = await page.content()
  68  |     expect(content).toBeTruthy()
  69  |     expect(content.length).toBeGreaterThan(100)
  70  |   })
  71  | })
  72  | 
  73  | test.describe('Navigation', () => {
  74  |   test('language switcher exists', async ({ page }) => {
  75  |     await page.goto('/en', { waitUntil: 'networkidle' })
  76  |     
  77  |     await page.waitForTimeout(500)
  78  |     
  79  |     // Find any language switcher element
  80  |     const content = await page.content()
  81  |     expect(content).toMatch(/Español|English/)
  82  |   })
  83  | 
  84  |   test('page has links', async ({ page }) => {
> 85  |     await page.goto('/en', { waitUntil: 'networkidle' })
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/en
  86  |     
  87  |     await page.waitForTimeout(500)
  88  |     
  89  |     // Check for links
  90  |     const linkCount = await page.locator('a').count()
  91  |     expect(linkCount).toBeGreaterThan(0)
  92  |   })
  93  | })
  94  | 
  95  | test.describe('Responsive Design', () => {
  96  |   test('renders on mobile', async ({ page }) => {
  97  |     await page.setViewportSize({ width: 375, height: 667 })
  98  |     await page.goto('/en', { waitUntil: 'networkidle' })
  99  |     
  100 |     await page.waitForTimeout(1000)
  101 |     
  102 |     // Page should load on mobile
  103 |     const content = await page.content()
  104 |     expect(content).toContain('mnopi')
  105 |   })
  106 | 
  107 |   test('renders on desktop', async ({ page }) => {
  108 |     await page.setViewportSize({ width: 1920, height: 1080 })
  109 |     await page.goto('/en', { waitUntil: 'networkidle' })
  110 |     
  111 |     await page.waitForTimeout(1000)
  112 |     
  113 |     // Page should load on desktop
  114 |     const content = await page.content()
  115 |     expect(content).toContain('mnopi')
  116 |   })
  117 | 
  118 |   test('renders on tablet', async ({ page }) => {
  119 |     await page.setViewportSize({ width: 768, height: 1024 })
  120 |     await page.goto('/en', { waitUntil: 'networkidle' })
  121 |     
  122 |     await page.waitForTimeout(1000)
  123 |     
  124 |     // Page should load on tablet
  125 |     const content = await page.content()
  126 |     expect(content).toContain('mnopi')
  127 |   })
  128 | })
  129 | 
  130 | test.describe('Performance', () => {
  131 |   test('page loads within timeout', async ({ page }) => {
  132 |     const startTime = Date.now()
  133 |     await page.goto('/en', { waitUntil: 'networkidle' })
  134 |     const loadTime = Date.now() - startTime
  135 |     
  136 |     // Page should load within 10 seconds
  137 |     expect(loadTime).toBeLessThan(10000)
  138 |   })
  139 | })
  140 | 
```