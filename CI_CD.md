# CI/CD Pipeline

Automated testing and deployment pipeline using GitHub Actions.

## Workflows

### 1. Tests (`tests.yml`)
Runs on: `push` to `main`/`develop`, `pull_request` against `main`/`develop`

**Jobs:**
- **Unit Tests**: Jest tests with coverage report
  - Runs: `npm test -- --coverage`
  - Uploads coverage to Codecov
  - Artifacts: `coverage/` directory
  
- **E2E Tests**: Playwright tests
  - Installs Playwright browsers
  - Builds application with `npm run build`
  - Runs: `npm run e2e`
  - Artifacts: `playwright-report/` (30 day retention)
  
- **Build Check**: Verifies Next.js build succeeds
  - Runs: `npm run build`
  - Checks `.next` output exists

**Matrix:**
- Node.js: 24.x (matching repository minimum)

### 2. Lint & Type Check (`lint.yml`)
Runs on: `push` to `main`/`develop`, `pull_request` against `main`/`develop`

**Jobs:**
- **ESLint & TypeScript**
  - Runs ESLint: `npm run lint`
  - Runs TypeScript check: `npx tsc --noEmit`
  - Non-blocking (continues on failure)

## Status Checks

Add these branch protection rules in GitHub:
1. Require "Tests / unit-tests" to pass
2. Require "Tests / e2e-tests" to pass
3. Require "Tests / build" to pass
4. Require "Lint & Type Check / lint-and-types" to pass

## Coverage Reports

Coverage reports are automatically uploaded to Codecov on successful runs.
- View at: `https://codecov.io/gh/j5pu/fatilum`
- Reports included: `coverage-final.json`

## Artifacts

Automatically uploaded and available for download:
- **coverage-report**: Jest coverage output
- **playwright-report**: Playwright HTML test report (30 day retention)

Access via Actions tab → specific run → Artifacts

## Local Testing

Run the same tests locally before pushing:

```bash
# Unit tests
npm test

# E2E tests (requires dev server running on port 3001)
npm run dev &
npm run e2e

# Build check
npm run build

# Lint & type check
npm run lint
npx tsc --noEmit
```

## Requirements

- **Node.js 24.x+** (via `.nvmrc` and `package.json` engines)
- **npm dependencies** must be installed
- **Build output** (`.next/`) required for E2E tests

## Deployment

After CI/CD passes:
1. Deploy to production manually or via workflow
2. Use Vercel CLI or GitHub integration
3. Set Vercel environment variables in GitHub Secrets

## Troubleshooting

### E2E Tests Fail Locally But Pass in CI
- Ensure dev server on port 3001 is running
- Clear Playwright cache: `rm -rf ~/Library/Caches/ms-playwright/`
- Reinstall browsers: `npx playwright install`

### Coverage Decreases
- Add tests for new code
- Aim for 80%+ coverage
- Review coverage report in artifacts

### Build Fails in CI
- Check Node.js version matches 24.x
- Verify `npm ci` installs correctly
- Review build logs in Actions output
