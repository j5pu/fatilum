# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: languages.spec.ts >> Language Support - All 7 Languages >> Language selector shows Deutsch as active
- Location: e2e/languages.spec.ts:28:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button[aria-label="Select language"]')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [active]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - navigation [ref=e7]:
          - button [disabled] [ref=e8]:
            - img "previous" [ref=e9]
          - generic [ref=e11]:
            - generic [ref=e12]: 1/
            - generic [ref=e13]: "8"
          - button [ref=e14] [cursor=pointer]:
            - img "next" [ref=e15]
        - generic [ref=e18]:
          - generic "Latest available version is detected (16.3.1)." [ref=e21]: Next.js 16.3.1
          - generic [ref=e22]: Turbopack
      - dialog "Console Error" [ref=e24]:
        - generic [ref=e27]:
          - generic [ref=e29]:
            - generic [ref=e30]:
              - generic [ref=e31]: Console Error
              - generic [ref=e33]:
                - button "Copy Error Info" [ref=e34] [cursor=pointer]
                - button "No related documentation found" [disabled] [ref=e37]
                - button "Attach Node.js inspector" [ref=e40] [cursor=pointer]
            - generic [ref=e49]: "MISSING_MESSAGE: No messages were configured."
          - generic [ref=e51]:
            - generic [ref=e52]:
              - paragraph [ref=e54]:
                - generic [ref=e59]: src/components/Header/Header.tsx (16:30) @ Header
                - button "Open in editor" [ref=e60] [cursor=pointer]
              - generic [ref=e64]:
                - generic [ref=e65]: 14 | const [openMobileMenu, setOpenMobileMenu] = useState(false)
                - generic [ref=e66]: 15 | const [contactFormOpen, setContactFormOpen] = useState(false)
                - generic [ref=e67]: "> 16 | const t = useTranslations('Home.Header.CallToAction');"
                - generic [ref=e68]: "| ^"
                - generic [ref=e69]: 17 |
                - generic [ref=e70]: 18 | const dataCabecera = [
                - generic [ref=e71]: "19 | {"
            - generic [ref=e72]:
              - generic [ref=e73]:
                - paragraph [ref=e74]:
                  - text: Call Stack
                  - generic [ref=e75]: "22"
                - button "Show 20 ignore-listed frame(s)" [ref=e76] [cursor=pointer]
              - generic [ref=e79]:
                - generic [ref=e80]:
                  - text: Header
                  - button "Open Header in editor" [ref=e81] [cursor=pointer]
                - text: src/components/Header/Header.tsx (16:30)
              - generic [ref=e84]:
                - generic [ref=e85]:
                  - text: Home
                  - button "Open Home in editor" [ref=e86] [cursor=pointer]
                - text: src/app/[locale]/page.tsx (19:7)
    - generic [ref=e93] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e94]
      - generic [ref=e98]:
        - button "Open issues overlay" [ref=e99]:
          - generic [ref=e100]:
            - generic [ref=e101]: "7"
            - generic [ref=e102]: "8"
          - generic [ref=e103]:
            - text: Issue
            - generic [ref=e104]: s
        - button "Collapse issues badge" [ref=e105]
  - generic [ref=e109]:
    - heading "This page couldn’t load" [level=1] [ref=e112]
    - paragraph [ref=e113]: A server error occurred. Reload to try again.
    - button "Reload" [ref=e116] [cursor=pointer]
  - paragraph [ref=e117]: ERROR 2711774174
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Language Support - All 7 Languages', () => {
  4  |   const languages = [
  5  |     { code: 'en', name: 'English' },
  6  |     { code: 'es', name: 'Español' },
  7  |     { code: 'ee', name: 'Eesti' },
  8  |     { code: 'pt', name: 'Português' },
  9  |     { code: 'it', name: 'Italiano' },
  10 |     { code: 'fr', name: 'Français' },
  11 |     { code: 'de', name: 'Deutsch' },
  12 |   ];
  13 | 
  14 |   languages.forEach(({ code, name }) => {
  15 |     test(`Page loads in ${name} (${code})`, async ({ page }) => {
  16 |       const url = code === 'en' ? 'http://localhost:3000/en' : `http://localhost:3000/${code}`;
  17 |       await page.goto(url, { waitUntil: 'networkidle' });
  18 |       
  19 |       // Page should load without errors
  20 |       const title = await page.title();
  21 |       expect(title).toBeTruthy();
  22 |       
  23 |       // Language selector should be visible
  24 |       const langButton = page.locator('button[aria-label="Select language"]');
  25 |       await expect(langButton).toBeVisible();
  26 |     });
  27 | 
  28 |     test(`Language selector shows ${name} as active`, async ({ page }) => {
  29 |       const url = code === 'en' ? 'http://localhost:3000/en' : `http://localhost:3000/${code}`;
  30 |       await page.goto(url, { waitUntil: 'networkidle' });
  31 |       
  32 |       const langButton = page.locator('button[aria-label="Select language"]');
> 33 |       await langButton.click();
     |                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  34 |       
  35 |       // The current language should be highlighted
  36 |       const currentLangLink = page.locator(`a:has-text("${code.toUpperCase()}")`).first();
  37 |       const classes = await currentLangLink.getAttribute('class');
  38 |       expect(classes).toContain('font-semibold');
  39 |     });
  40 |   });
  41 | });
  42 | 
```