/**
 * Cloudflare Pages Middleware
 * Handles Next.js compatibility with Cloudflare Workers environment
 * https://developers.cloudflare.com/pages/functions/middleware/
 */

const onRequest = async (context: any) => {
  // Pass through to Next.js app
  return context.next();
};

export default onRequest;
