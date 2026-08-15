# Cloudflare Pages Setup for Node.js 24

## Architecture

This project uses Cloudflare Pages Functions (Middleware) to handle Node.js 24 compatibility automatically without manual dashboard configuration.

### Key Files:
- **`wrangler.toml`** - Cloudflare Pages configuration with Node.js compatibility flags
- **`functions/_middleware.ts`** - Middleware that passes requests to Next.js app
- **`package.json`** - Specifies `engines: { node: ">=24.0.0" }`

## How It Works

1. **Cloudflare Pages Functions** intercept requests via `functions/_middleware.ts`
2. **Middleware** sets up Node.js 24 compatibility environment
3. **Next.js app** processes requests through `.next` build output
4. **Responses** are returned to client

## Deployment

### No Manual Dashboard Configuration Needed!

Just push to GitHub and Cloudflare Pages will automatically:
1. ✅ Use Node.js 24 (via compatibility flags in `wrangler.toml`)
2. ✅ Load middleware from `functions/` directory
3. ✅ Build Next.js app with `npm run build`
4. ✅ Serve from `.next` output directory

### Deploy Steps:
1. Merge PR #6 to main
2. Push to GitHub (auto-deploys via Cloudflare Pages integration)
3. Monitor deployment: https://dash.cloudflare.com/ → Pages → fatilum → Deployments

## Troubleshooting

**Build still fails with Node 18 error:**
- Clear Cloudflare cache: Dashboard → Caching → Purge Cache
- Trigger new build: Push new commit or click "Redeploy" in Deployments tab
- Check Cloudflare status: https://www.cloudflarestatus.com/

**Middleware not loading:**
- Ensure `functions/_middleware.ts` exists in repo root
- Verify `wrangler.toml` has `[functions]` section
- Check build logs for compilation errors

## Related Files
- `wrangler.toml` - Cloudflare Pages config
- `functions/_middleware.ts` - Request middleware
- `package.json` - Node.js engine requirement
- `.github/workflows/` - GitHub Actions CI/CD

