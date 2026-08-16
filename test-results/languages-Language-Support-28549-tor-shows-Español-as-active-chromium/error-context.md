# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: languages.spec.ts >> Language Support - All 7 Languages >> Language selector shows Español as active
- Location: e2e/languages.spec.ts:28:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "font-semibold"
Received string:    "text-lg hover:text-secondary"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e4]:
    - link [ref=e5] [cursor=pointer]:
      - /url: /es
      - img "mnopi logo" [ref=e6]
    - generic [ref=e8]:
      - link "Somos" [ref=e10] [cursor=pointer]:
        - /url: "#about"
      - link "Empresas" [ref=e12] [cursor=pointer]:
        - /url: "#companies"
      - button "Contacto" [ref=e14] [cursor=pointer]
      - generic [ref=e16]:
        - button "Select language" [active] [ref=e17] [cursor=pointer]
        - generic [ref=e20]:
          - link "EN - English" [ref=e21] [cursor=pointer]:
            - /url: /en
          - link "ES - Español" [ref=e22] [cursor=pointer]:
            - /url: /es
          - link "EE - Eesti" [ref=e23] [cursor=pointer]:
            - /url: /ee
          - link "PT - Português" [ref=e24] [cursor=pointer]:
            - /url: /pt
          - link "IT - Italiano" [ref=e25] [cursor=pointer]:
            - /url: /it
          - link "FR - Français" [ref=e26] [cursor=pointer]:
            - /url: /fr
          - link "DE - Deutsch" [ref=e27] [cursor=pointer]:
            - /url: /de
  - generic [ref=e28]:
    - img "Circle Right" [ref=e30]
    - generic [ref=e31]:
      - generic [ref=e32]:
        - heading "Asesoramiento M&A para empresas IT" [level=1] [ref=e35]:
          - generic [ref=e36]: Asesoramiento
          - text: M&A
          - generic [ref=e37]: para empresas IT
        - paragraph [ref=e40]: Transparencia e innovación en fusiones y adquisiciones, para ayudar al crecimiento de PYMEs, dando mayor claridad sobre el potencial y futuro de la operación. Acceso a empresas tecnológicas compradoras e inversores privados.
        - button "Empresas" [ref=e44] [cursor=pointer]
      - img "Card" [ref=e47]
  - generic [ref=e48]:
    - img "Circle Left" [ref=e50]
    - generic [ref=e51]:
      - generic [ref=e52]:
        - heading "Acompañamos empresas:" [level=2] [ref=e55]:
          - text: Acompañamos
          - generic [ref=e56]: "empresas:"
        - button "Contacto" [ref=e61] [cursor=pointer]
      - generic [ref=e63]:
        - generic [ref=e66]:
          - img "B2B" [ref=e67]
          - generic [ref=e68]:
            - heading "B2B" [level=4] [ref=e69]
            - paragraph [ref=e70]: B2B verticales en mercados especializados, con equipo implicado y conocimiento del sector.
        - generic [ref=e74]:
          - img "Recurrente" [ref=e75]
          - generic [ref=e76]:
            - heading "Recurrente" [level=4] [ref=e77]
            - paragraph [ref=e78]: Potencial hacia modelo de negocio recurrente, escalable y alcance global.
        - generic [ref=e82]:
          - img "Generador" [ref=e83]
          - generic [ref=e84]:
            - heading "Generador" [level=4] [ref=e85]
            - paragraph [ref=e86]: Generadores de caja, con impacto y barreras de entrada.
  - generic [ref=e90]:
    - generic [ref=e91]: +6 paises
    - generic [ref=e92]: +30 empresas
    - generic [ref=e93]: +64 millones €
  - generic [ref=e96]:
    - generic [ref=e97]: © 2026 fatilum OÜ
    - generic [ref=e101]:
      - link "Privacy Policy" [ref=e102] [cursor=pointer]:
        - /url: /es/privacy
      - link "Legal Notice" [ref=e103] [cursor=pointer]:
        - /url: /es/legal
    - generic [ref=e104]:
      - button [ref=e105] [cursor=pointer]
      - link [ref=e108] [cursor=pointer]:
        - /url: https://linkedin.com/company/fatilum
  - button "Open Next.js Dev Tools" [ref=e116] [cursor=pointer]
  - alert [ref=e120]
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
  33 |       await langButton.click();
  34 |       
  35 |       // The current language should be highlighted
  36 |       const currentLangLink = page.locator(`a:has-text("${code.toUpperCase()}")`).first();
  37 |       const classes = await currentLangLink.getAttribute('class');
> 38 |       expect(classes).toContain('font-semibold');
     |                       ^ Error: expect(received).toContain(expected) // indexOf
  39 |     });
  40 |   });
  41 | });
  42 | 
```