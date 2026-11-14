import type { APIRoute } from 'astro';
import { getProjets, getPoster, plainText } from '../lib/projets';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** ISO 8601 (PT1M12S) vers secondes, format attendu par le sitemap vidéo */
const seconds = (duree: string) => {
  const [, h = '0', m = '0', s = '0'] = duree.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/) ?? [];
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
};

/** Sitemap vidéo : les réalisations sont toutes sur la page d'accueil */
export const GET: APIRoute = async ({ site }) => {
  const projets = await getProjets();
  const videos = await Promise.all(
    projets.map(async (projet) => {
      const poster = await getPoster(projet);
      const { titre, video, duree, date } = projet.data;
      return `    <video:video>
      <video:thumbnail_loc>${escape(new URL(poster.src, site).href)}</video:thumbnail_loc>
      <video:title>${escape(titre)}</video:title>
      <video:description>${escape(plainText(projet))}</video:description>
      <video:content_loc>${escape(new URL(video, site).href)}</video:content_loc>
      <video:duration>${seconds(duree)}</video:duration>
      <video:publication_date>${date.toISOString().slice(0, 10)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${new URL('/', site).href}</loc>
${videos.join('\n')}
  </url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
