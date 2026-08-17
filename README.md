# Fatilum - M&A Intelligence & Scouting Platform

> A modern, high-performance web application for M&A opportunity research and company scouting, built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

[![Node.js](https://img.shields.io/badge/Node.js->=24.0.0-green?logo=node.js)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/j5pu/fatilum/tests.yml?branch=main&logo=github&label=Tests)](https://github.com/j5pu/fatilum/actions/workflows/tests.yml)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-FF6D00?logo=cloudflare)](https://fatilum.pages.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)]()

## 🚀 Features

- **Multi-language Support** - English (en) and Spanish (es) with next-intl
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Animation Framework** - Smooth transitions with Framer Motion
- **Type-Safe** - Full TypeScript support with strict type checking
- **Internationalization** - Localized content and metadata
- **Performance Optimized** - Server-side rendering, image optimization, code splitting
- **SEO Ready** - Meta tags, canonical links, language alternates, structured data
- **Accessibility Compliant** - WCAG standards with axe-core testing
- **Modern Build** - Latest Next.js 16 with App Router & Turbopack

## 📋 Tech Stack

### Frontend
- **Next.js 16.3.1** - React framework with App Router
- **React 19.2.8** - UI library
- **TypeScript 6.0.3** - Type-safe development
- **Tailwind CSS 4.3.3** - Utility-first CSS framework (CSS-first config)
- **Framer Motion 13.1.0** - Animation library
- **next-intl 4.13.7** - Internationalization

### Development & Testing
- **Jest 30.4.2** - Unit testing framework
- **Playwright 1.62.1** - E2E browser testing
- **axe-core 4.13.0** - Accessibility testing
- **ESLint 9.39.5** - Code quality (flat config, `eslint.config.mjs`)
- **TypeScript** - Type checking

### Deployment
- **Vercel** - Production deployment
- **Cloudflare Pages** - Global CDN with Workers
- **GitHub Pages** - Alternative hosting

## 🏗️ Project Structure

```
fatilum/
├── src/
│   ├── app/                    # Next.js App Router
│   │   └── [locale]/          # i18n dynamic routes
│   │       ├── layout.tsx      # Root layout with client provider
│   │       └── page.tsx        # Home page
│   ├── components/             # React components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── About/
│   │   ├── Companies/
│   │   ├── Counter/
│   │   ├── MotionTransition/
│   │   └── Reveal/
│   ├── lib/                    # Utilities
│   │   ├── intl.ts            # i18n setup
│   │   └── host.ts            # Host/URL utilities
│   └── styles/                 # Global styles
├── public/                      # Static assets
├── e2e/                         # Playwright E2E tests
├── functions/                   # Cloudflare Pages middleware
├── .github/workflows/           # GitHub Actions CI/CD
├── wrangler.toml               # Cloudflare Pages config
├── jest.config.js              # Jest configuration
├── eslint.config.mjs           # ESLint 9 flat config
└── next.config.mjs             # Next.js configuration
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js:** >=24.0.0 ([Install](https://nodejs.org/))
- **npm:** 11.x or higher

### Local Development

```bash
# Clone repository
git clone https://github.com/j5pu/fatilum.git
cd fatilum

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# English: http://localhost:3000/en
# Spanish: http://localhost:3000/es
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build            # Build for production
npm start               # Start production server

# Testing
npm test                # Run unit tests (Jest)
npm run test:watch      # Watch mode for unit tests
npm run test:coverage   # Generate coverage report
npm run e2e             # Run E2E tests (Playwright)
npm run e2e:debug       # Debug E2E tests

# Code Quality
npm run lint            # Run ESLint & TypeScript checks
```

## 🧪 Testing

### Unit Tests (Jest)
- 62 component tests across 10 suites with React Testing Library
- Coverage for Header, Footer, Companies, Counter, ContactForm, and more
- Mock setup for Framer Motion, Next.js Image, next-intl

**Run:** `npm test`

### E2E Tests (Playwright)
- 102 end-to-end browser tests across 8 spec files
- Page loading, content, SEO validation
- Responsive design testing (mobile/tablet/desktop)
- Accessibility compliance (WCAG) with axe-core
- Performance & timeout verification
- Requires a server running at `localhost:3000` (`npm run dev` or `npm run build && npm start`) — Playwright does not auto-start one

**Run:** `npm run e2e`

### Test Results
```
✅ 62/62 unit tests passing
✅ 102/102 E2E tests passing
✅ All accessibility checks passing
✅ Build validation passing
✅ npm audit: 0 vulnerabilities
```

## 🚀 Deployment

### Vercel (Production)
- Auto-deployed on push to `main` branch
- Environment: Node.js 24
- URL: https://fatilum.vercel.app

### Cloudflare Pages (v3 Build Image)

**Architecture**
- Cloudflare Pages v3 Build Image (supports Node.js 24)
- No manual dashboard configuration needed
- Files: `wrangler.toml` + `.node-version` + `functions/_middleware.ts`

**How It Works**
1. Cloudflare v3 build image detects Node.js 24 from `.node-version`
2. Cloudflare Functions middleware intercepts requests via `functions/_middleware.ts`
3. Next.js app processes requests through `.next` build output
4. Responses returned to client

**Deployment**
Just push to GitHub — Cloudflare Pages v3 auto-deploys:
- ✅ Uses Node.js 24 (detected from `.node-version` file)
- ✅ Loads middleware from `functions/` directory
- ✅ Builds Next.js with `npm run build`
- ✅ Serves from `.next` output directory

**Configuration Files**
- `wrangler.toml` - Pages build configuration
- `.node-version` - Specifies Node.js version (24)
- `functions/_middleware.ts` - Request middleware
- `package.json` - Engine requirement (>=24.0.0)

**Troubleshooting**
- Build still uses Node 18: Clear Cloudflare cache (Dashboard → Caching → Purge Cache)
- Middleware not loading: Verify `functions/_middleware.ts` exists and `wrangler.toml` has `[functions]` section
- Wrong Node.js version: Check `.node-version` file contains only version number
- Check deployment logs: https://dash.cloudflare.com/ → Pages → fatilum → Deployments

### GitHub Actions CI/CD

**Workflows**

| Workflow | Trigger | Jobs | Status |
|----------|---------|------|--------|
| **Lint** | Push/PR | ESLint + TypeScript | [![Lint](https://github.com/j5pu/fatilum/actions/workflows/lint.yml/badge.svg)](https://github.com/j5pu/fatilum/actions/workflows/lint.yml) |
| **Tests** | Push/PR | Unit + Build + E2E | [![Tests](https://github.com/j5pu/fatilum/actions/workflows/tests.yml/badge.svg)](https://github.com/j5pu/fatilum/actions/workflows/tests.yml) |

**Branch Protection**

Main branch requires all checks to pass:
1. ✅ Lint & Type Check (Node 24.x)
2. ✅ Unit Tests (Node 24.x)
3. ✅ Build Check (Node 24.x)
4. ✅ E2E Tests (Node 24.x)

**Deployment Flow**
```
Push to GitHub
         ↓
GitHub Actions triggered
         ↓
Lint & Type Check ✅
         ↓
Unit Tests ✅
         ↓
Build Check ✅
         ↓
E2E Tests ✅
         ↓
All passing → Auto-deploy to Vercel & Cloudflare
         ↓
✅ Production live
```

**Workflow Details**

*Lint & Type Check (lint.yml)*
- Runs: ESLint & TypeScript validation
- Node.js: 24.x
- Duration: ~2 minutes
- Command: `npm run lint`

*Tests (tests.yml)*
- **Unit Tests:** Jest suite (62 tests, ~1s)
- **Build Check:** Next.js production build
- **E2E Tests:** Playwright browser tests (102 tests, ~2-3 minutes)
- Command: `npm test`, `npm run build`, `npm run e2e`

**Manual Trigger**
1. Go to **Actions** tab
2. Select **Lint & Type Check** or **Tests**
3. Click **Run workflow**
4. Select branch and confirm

## 📚 Documentation

- Repository conventions and upgrade history: see closed PRs and commit history on `main`

## 🌐 Internationalization

### Supported Languages
- **English** (en) - Default
- **Spanish** (es)

### Add New Language
1. Add locale to `navigation.ts`
2. Create translation files in `messages/`
3. Add to `i18n.ts` validation

## 🔐 Security & Best Practices

- ✅ Node.js 24 (latest LTS)
- ✅ Type-safe with TypeScript 6
- ✅ Accessibility compliant (WCAG)
- ✅ Security headers configured
- ✅ Dependency auditing via npm audit (0 known vulnerabilities)
- ✅ Branch protection on main

## 📊 Performance

- **Lighthouse Scores:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals:** Optimized
- **Client JS:** ~820KB uncompressed across chunks (largest single chunk ~224KB)
- **CDN:** Global distribution via Vercel/Cloudflare

## 🐛 Troubleshooting

### Node.js Version Issues
```bash
# Verify Node.js version
node --version  # Should be >=24.0.0

# Install latest Node.js
nvm install 24
nvm use 24
```

### Port Already in Use
```bash
# Dev server uses port 3000
# If already in use:
PORT=3001 npm run dev
```

### Build Failures
```bash
# Clean rebuild
rm -rf .next node_modules
npm install
npm run build
```

## 📝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request
5. Ensure all CI checks pass

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**José Antonio Puértolas Montañés**
- GitHub: [@j5pu](https://github.com/j5pu)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

---

**Last Updated:** August 17, 2026 | **Node.js:** 24.x | **Next.js:** 16.3.1 | **React:** 19.2.8 | **TypeScript:** 6.0.3 | **Tailwind:** 4.3.3

