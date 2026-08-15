import { test, expect } from '@playwright/test'

test.describe('Home Page - English', () => {
  test('loads homepage', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    // Check page loads successfully (may redirect to /)
    expect(page.url()).toMatch(/\/(en)?$/)
  })

  test('page contains content', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    // Wait for content to load
    await page.waitForTimeout(1000)
    
    // Check for main content
    const content = await page.content()
    expect(content).toContain('About')
    expect(content).toContain('Companies')
  })

  test('has correct page title', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    await expect(page).toHaveTitle(/mnopi/)
  })

  test('displays meta description', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toContain('M&A')
  })

  test('has canonical link', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBeTruthy()
  })

  test('has language alternate links', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    const enAlternate = await page.locator('link[rel="alternate"][hrefLang="en"]').getAttribute('href')
    const esAlternate = await page.locator('link[rel="alternate"][hrefLang="es"]').getAttribute('href')
    
    expect(enAlternate).toBeTruthy()
    expect(esAlternate).toBeTruthy()
  })
})

test.describe('Home Page - Spanish', () => {
  test('loads Spanish homepage', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    
    expect(page.url()).toMatch(/\/(es)?$/)
  })

  test('renders content in Spanish', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    
    await page.waitForTimeout(1000)
    
    // Check content loads
    const content = await page.content()
    expect(content).toBeTruthy()
    expect(content.length).toBeGreaterThan(100)
  })
})

test.describe('Navigation', () => {
  test('language switcher exists', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    await page.waitForTimeout(500)
    
    // Find any language switcher element
    const content = await page.content()
    expect(content).toMatch(/Español|English/)
  })

  test('page has links', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    await page.waitForTimeout(500)
    
    // Check for links
    const linkCount = await page.locator('a').count()
    expect(linkCount).toBeGreaterThan(0)
  })
})

test.describe('Responsive Design', () => {
  test('renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    await page.waitForTimeout(1000)
    
    // Page should load on mobile
    const content = await page.content()
    expect(content).toContain('mnopi')
  })

  test('renders on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    await page.waitForTimeout(1000)
    
    // Page should load on desktop
    const content = await page.content()
    expect(content).toContain('mnopi')
  })

  test('renders on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    await page.waitForTimeout(1000)
    
    // Page should load on tablet
    const content = await page.content()
    expect(content).toContain('mnopi')
  })
})

test.describe('Performance', () => {
  test('page loads within timeout', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/en', { waitUntil: 'networkidle' })
    const loadTime = Date.now() - startTime
    
    // Page should load within 10 seconds
    expect(loadTime).toBeLessThan(10000)
  })
})
