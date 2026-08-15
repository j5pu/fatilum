/**
 * Cloudflare Pages Middleware
 * Handles Next.js compatibility with Cloudflare Workers environment
 * https://developers.cloudflare.com/pages/functions/middleware/
 */

export default async (context: any) => {
  // Pass through to Next.js app
  return context.next();
};
