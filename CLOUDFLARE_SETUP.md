# Cloudflare Pages Setup for Node.js 24

## Setting Node.js Version in Cloudflare Pages Dashboard

### Steps:
1. **Login to Cloudflare Dashboard:** https://dash.cloudflare.com/
2. **Navigate to Pages:**
   - Left sidebar → **Workers & Pages**
   - Click **Pages** tab
   
3. **Select your project:** Click on **fatilum**

4. **Go to Project Settings:**
   - Click **Settings** (top navigation)
   
5. **Find Build & Deploy Section:**
   - Look for **Environment variables** section
   
6. **Add Node.js Version Variable:**
   - Click **+ Add variable**
   - **Name:** `NODE_VERSION`
   - **Value:** `24`
   - **Production/Preview:** Select as needed
   - Click **Save**

7. **Alternative: Build Command**
   If environment variables don't work, set custom build command:
   - In **Build settings** → **Build command**
   - Change to: `NODE_VERSION=24 npm ci && npm run build`

8. **Trigger New Build:**
   - Go to **Deployments**
   - Click the latest failed deployment
   - Click **Redeploy** or push new commit to trigger build

## Expected Build Output
When successful, you should see:
```
node: v24.x.x
npm: 11.x.x
✓ Compiled successfully
```

## Troubleshooting

**If still getting Node 18 error:**
1. Clear Cloudflare cache in dashboard
2. Try pushing a new commit to trigger fresh build
3. Contact Cloudflare support: https://support.cloudflare.com/

**If `@cloudflare/workers-types` conflict:**
- Already fixed in PR #6
- Make sure PR is merged before redeploying

## Related Files
- `wrangler.toml` - Cloudflare Pages configuration
- `package.json` - engines field set to `>=24.0.0`
- `.github/workflows/` - GitHub Actions use Node 24
