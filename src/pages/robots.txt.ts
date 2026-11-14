import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const videos = new URL('sitemap-videos.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\nSitemap: ${videos}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
