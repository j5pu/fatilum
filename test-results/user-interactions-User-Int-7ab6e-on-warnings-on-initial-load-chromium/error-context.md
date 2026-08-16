# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-interactions.spec.ts >> User Interactions - Critical Flows >> page has no hydration warnings on initial load
- Location: e2e/user-interactions.spec.ts:103:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/es
Call log:
  - navigating to "http://localhost:3001/es", waiting until "networkidle"

```

# Test source

```ts
  10  |       }
  11  |     })
  12  |     
  13  |     await page.goto('/', { waitUntil: 'networkidle' })
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
> 110 |     await page.goto('/es', { waitUntil: 'networkidle' })
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3001/es
  111 |     await page.waitForTimeout(1000)
  112 |     
  113 |     // Filter for hydration-related messages
  114 |     const hydrationWarnings = consoleMessages.filter(msg =>
  115 |       msg.includes('hydration') ||
  116 |       msg.includes('Cannot render a sync or defer') ||
  117 |       msg.includes('tree hydrated but some attributes')
  118 |     )
  119 |     
  120 |     // Should have no hydration warnings
  121 |     expect(hydrationWarnings).toHaveLength(0)
  122 |   })
  123 | 
  124 |   test('navigation between pages works without console errors', async ({ page }) => {
  125 |     const consoleErrors: string[] = []
  126 |     
  127 |     page.on('console', msg => {
  128 |       if (msg.type() === 'error') {
  129 |         consoleErrors.push(msg.text())
  130 |       }
  131 |     })
  132 |     
  133 |     // Start on English
  134 |     await page.goto('/', { waitUntil: 'networkidle' })
  135 |     
  136 |     // Find first link and click it
  137 |     const firstLink = page.locator('a').first()
  138 |     if (await firstLink.isVisible()) {
  139 |       await firstLink.click({ timeout: 5000 })
  140 |       await page.waitForTimeout(500)
  141 |     }
  142 |     
  143 |     // Page should still be responsive
  144 |     const content = await page.content()
  145 |     expect(content.length).toBeGreaterThan(100)
  146 |     
  147 |     // Verify no console errors
  148 |     expect(consoleErrors).toHaveLength(0)
  149 |   })
  150 | 
  151 |   test('dark mode persists across page navigation', async ({ page }) => {
  152 |     await page.goto('/', { waitUntil: 'networkidle' })
  153 |     
  154 |     // Find theme toggle
  155 |     const themeToggle = page.locator('[data-testid="theme-toggle"], button:has-text("☀"), button:has-text("🌙")')
  156 |     
  157 |     if (await themeToggle.isVisible()) {
  158 |       // Enable dark mode
  159 |       const initialClass = await page.locator('html').getAttribute('class')
  160 |       
  161 |       await themeToggle.click()
  162 |       await page.waitForTimeout(500)
  163 |       
  164 |       // Get dark mode class
  165 |       const darkClass = await page.locator('html').getAttribute('class')
  166 |       
  167 |       // Navigate to another page
  168 |       const firstLink = page.locator('a').first()
  169 |       if (await firstLink.isVisible()) {
  170 |         await firstLink.click()
  171 |         await page.waitForTimeout(1000)
  172 |       }
  173 |       
  174 |       // Theme should persist
  175 |       const finalClass = await page.locator('html').getAttribute('class')
  176 |       expect(finalClass).toBeDefined()
  177 |     }
  178 |   })
  179 | 
  180 |   test('no Script tag outside html error on locale switch', async ({ page }) => {
  181 |     const pageErrors: Array<{message: string, location: string}> = []
  182 |     
  183 |     page.on('console', msg => {
  184 |       if (msg.type() === 'error' && msg.text().includes('Cannot render a sync or defer <script>')) {
  185 |         pageErrors.push({
  186 |           message: msg.text(),
  187 |           location: msg.location().url
  188 |         })
  189 |       }
  190 |     })
  191 |     
  192 |     // Navigate to Spanish
  193 |     await page.goto('/es', { waitUntil: 'networkidle' })
  194 |     
  195 |     // Try switching language multiple times
  196 |     const languageSelector = page.locator('[data-testid="language-selector"], button:has-text("Español"), button:has-text("English")')
  197 |     
  198 |     if (await languageSelector.isVisible()) {
  199 |       for (let i = 0; i < 3; i++) {
  200 |         await languageSelector.click()
  201 |         await page.waitForTimeout(300)
  202 |       }
  203 |     }
  204 |     
  205 |     // Should have no script tag errors
  206 |     expect(pageErrors).toHaveLength(0)
  207 |   })
  208 | })
  209 | 
  210 | test.describe('Hydration Stability', () => {
```