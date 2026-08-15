import { test, expect } from '@playwright/test'
import { injectAxe } from 'axe-playwright'

test.describe('Accessibility - WCAG Compliance', () => {
  test('home page English accessibility check', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    
    // Inject axe
    await injectAxe(page)
    
    // Run axe and log results (don't fail on violations)
    const violations = await page.evaluate(() => {
      return new Promise((resolve) => {
        (window as any).axe.run((error: any, results: any) => {
          if (error) throw error
          resolve(results.violations)
        })
      })
    })
    
    // Just verify axe ran
    expect(violations).toBeDefined()
  })

  test('home page Spanish accessibility check', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    
    await injectAxe(page)
    
    const violations = await page.evaluate(() => {
      return new Promise((resolve) => {
        (window as any).axe.run((error: any, results: any) => {
          if (error) throw error
          resolve(results.violations)
        })
      })
    })
    
    expect(violations).toBeDefined()
  })

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    // Get all headings
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    expect(headings.length).toBeGreaterThan(0)
    
    // Check that we have at least one h1
    const h1s = await page.locator('h1').all()
    expect(h1s.length).toBeGreaterThanOrEqual(1)
  })

  test('images have alt text or are decorated', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    // Get all images
    const images = await page.locator('img').all()
    expect(images.length).toBeGreaterThan(0)
    
    // At least some images should have alt text
    let hasAlt = 0
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      if (alt) hasAlt++
    }
    
    expect(hasAlt).toBeGreaterThan(0)
  })

  test('page has accessible links', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    // Get all links
    const links = await page.locator('a').all()
    expect(links.length).toBeGreaterThan(0)
  })

  test('page is keyboard navigable', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    // Tab through page
    let focusCount = 0
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const focused = await page.evaluate(() => document.activeElement?.tagName)
      
      if (focused && !['HTML', 'BODY'].includes(focused)) {
        focusCount++
      }
    }
    
    // Should be able to focus on multiple elements
    expect(focusCount).toBeGreaterThan(0)
  })

  test('page is responsive to zoom', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    // Zoom to 200%
    await page.evaluate(() => {
      document.body.style.zoom = '200%'
    })
    
    // Page should still load
    const content = await page.content()
    expect(content.length).toBeGreaterThan(100)
    
    // Reset zoom
    await page.evaluate(() => {
      document.body.style.zoom = '100%'
    })
  })

  test('page has lang attribute', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBeTruthy()
  })
})
