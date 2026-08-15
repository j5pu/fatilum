# CI/CD Pipeline Documentation

> Automated testing, building, and deployment workflow for Fatilum

## 📋 Overview

This project uses **GitHub Actions** for continuous integration and deployment. All pull requests to `main` branch require:
- ✅ Linting & type checking pass
- ✅ Unit tests pass
- ✅ Production build succeeds
- ✅ E2E tests pass

## 🔄 Workflows

### 1. Lint & Type Check (`lint.yml`)

**Triggers:** Push to `main`/`develop`, any Pull Request

**Jobs:**
- **ESLint & TypeScript (Node 24.x)**
  - Lints code with ESLint
  - Type checks with TypeScript
  - Checks for common errors

**Command:** `npm run lint`

**Status Badge:** [![Lint & Type Check](https://github.com/j5pu/fatilum/actions/workflows/lint.yml/badge.svg)](https://github.com/j5pu/fatilum/actions/workflows/lint.yml)

---

### 2. Tests (`tests.yml`)

**Triggers:** Push to `main`/`develop`, any Pull Request

**Jobs:**

#### Unit Tests (Node 24.x)
- Jest test suite: 19 component tests
- Coverage for all components
- Fast execution (~10s)

**Command:** `npm test`

#### Build Check (Node 24.x)
- Next.js production build
- TypeScript compilation
- Asset optimization
- Verifies buildability

**Command:** `npm run build`

#### E2E Tests (Node 24.x)
- Playwright browser tests: 22 end-to-end scenarios
- Page loading & content validation
- Responsive design testing
- Accessibility compliance checks
- Performance benchmarks
- Longer execution (~2-3 minutes)

**Command:** `npm run e2e`

**Status Badge:** [![Tests](https://github.com/j5pu/fatilum/actions/workflows/tests.yml/badge.svg)](https://github.com/j5pu/fatilum/actions/workflows/tests.yml)

---

## 🛡️ Branch Protection

**Main branch** requires all status checks to pass before merging:

1. ✅ Lint & Type Check (Node 24.x)
2. ✅ Unit Tests (Node 24.x)
3. ✅ Build Check (Node 24.x)
4. ✅ E2E Tests (Node 24.x)

**Configure in:** Settings → Branches → Branch Protection Rules → Require status checks

---

## 🚀 Deployment Flow

```
Push to GitHub
         ↓
GitHub Actions triggered
         ↓
Lint & Type Check
         ↓
Unit Tests
         ↓
Build Check
         ↓
E2E Tests
         ↓
All passing? ✅
         ↓
Vercel & Cloudflare auto-deploy
         ↓
✅ Production live
```

---

## 📊 Test Coverage

### Unit Tests (19 tests)
- **Header:** Navigation, language switching
- **Footer:** Links, content
- **Companies:** List rendering, filtering
- **Counter:** Animation, state management

### E2E Tests (22 tests)

**Page Loading (4 tests)**
- Homepage loads successfully
- Content renders properly
- Spanish locale works
- Meta tags present

**SEO & Meta (4 tests)**
- Page title correct
- Meta description exists
- Canonical links configured
- Language alternates present

**Navigation (2 tests)**
- Language switcher functional
- Internal links work

**Responsive Design (3 tests)**
- Mobile layout (320px)
- Tablet layout (768px)
- Desktop layout (1920px)

**Accessibility (8 tests)**
- WCAG compliance via axe-core
- Proper heading hierarchy
- Images have alt text
- Links are accessible
- Page is keyboard navigable
- Zoom responsiveness
- Lang attribute present

**Performance (1 test)**
- Page loads within 5 seconds

---

## 🔧 Configuration Files

### `.github/workflows/lint.yml`
```yaml
- Runs: ESLint & TypeScript check
- Node.js: 24.x
- Triggers: Push to main/develop, PRs
- Duration: ~2 minutes
```

### `.github/workflows/tests.yml`
```yaml
- Runs: Unit tests, Build check, E2E tests
- Node.js: 24.x
- Triggers: Push to main/develop, PRs
- Duration: ~5 minutes
```

### Matrix Build Strategy
```yaml
node-version: [24.x]
# Easily add more versions:
# node-version: [22.x, 24.x]
```

---

## ⚙️ Manual Workflow Triggers

You can manually trigger workflows via GitHub Actions tab:

1. Go to **Actions** tab
2. Select **Lint & Type Check** or **Tests**
3. Click **Run workflow**
4. Select branch
5. Click **Run workflow** button

---

## 📈 Monitoring & Debugging

### View Workflow Results
1. Go to **Actions** tab
2. Click workflow run
3. View job logs
4. Expand failed job for error details

### Common Issues & Solutions

**✗ Lint fails**
```bash
# Fix ESLint issues
npm run lint
# Auto-fix where possible
npx eslint --fix src/
```

**✗ Tests fail locally but pass in CI**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm test
npm run e2e
```

**✗ Build fails**
```bash
# Check TypeScript errors
npx tsc --noEmit
# Rebuild
npm run build
```

**✗ E2E tests timeout**
- Increase `waitUntil: 'networkidle'` in playwright.config.ts
- Check if dev server is running
- Verify network connectivity

---

## 🔐 Security & Secrets

No secrets are stored in workflows. All sensitive data (API keys, credentials) must be:
- Added to GitHub Secrets in **Settings → Secrets and variables**
- Referenced in workflow as `${{ secrets.SECRET_NAME }}`
- Never committed to repository

---

## 📝 Logs & Artifacts

### Available Logs
- **Build logs:** `.github/workflows/` output
- **Test reports:** `test-results/` directory
- **Coverage reports:** `coverage/` directory
- **Playwright reports:** `playwright-report/` directory

### Download Artifacts
Some workflows may store artifacts. To download:
1. Go to **Actions** tab
2. Click workflow run
3. Scroll to **Artifacts** section
4. Download as needed

---

## 🚨 Troubleshooting

### Workflow Not Triggering
- ✅ Check branch name (must be `main`, `develop`, or PR)
- ✅ Ensure `.github/workflows/` files exist
- ✅ Verify workflow files are valid YAML
- ✅ Check repository settings → Actions is enabled

### Node.js Version Mismatch
- GitHub Actions: 24.x (hardcoded)
- Local: >=24.0.0 (from package.json)
- Use `nvm use 24` to match CI environment

### Dependencies Not Installing
```bash
# In workflows, use:
npm ci  # Clean install (reproducible)

# Locally, use:
npm install  # Development install
```

---

## 📚 References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Jest Testing Framework](https://jestjs.io/)
- [Playwright E2E Testing](https://playwright.dev/)
- [ESLint Configuration](https://eslint.org/)

---

## ✍️ Modifying Workflows

### Add New Job
```yaml
new-job:
  name: New Job Name
  runs-on: ubuntu-latest
  strategy:
    matrix:
      node-version: [24.x]
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: your-command-here
```

### Change Node.js Version
Update in both `lint.yml` and `tests.yml`:
```yaml
node-version: [24.x]  # Change this
```

### Add New Test Suite
1. Create test files
2. Add test command to package.json
3. Add step to workflow:
```yaml
- run: npm run new-tests
```

---

**Last Updated:** August 15, 2026
**Status:** ✅ All workflows operational
