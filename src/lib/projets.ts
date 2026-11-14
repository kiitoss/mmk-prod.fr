import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';

export type Projet = CollectionEntry<'projets'>;

export const typeLabels: Record<Projet['data']['type'], string> = {
  aftermovie: 'Aftermovie',
  captation: 'Captation',
  reel: 'Reel',
};

/** Tous les projets, du plus récent au plus ancien */
export async function getProjets(): Promise<Projet[]> {
  const projets = await getCollection('projets');
  return projets.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);

/** Description en texte brut (corps Markdown sans mise en forme) */
export const plainText = (projet: Projet) =>
  (projet.body ?? '').replace(/[*_`#>[\]]/g, '').replace(/\s+/g, ' ').trim();

/** Image d'aperçu optimisée (WebP) */
export const getPoster = (projet: Projet) =>
  getImage({ src: projet.data.poster, format: 'webp', width: projet.data.vertical ? 540 : 960 });

/** Données structurées VideoObject (schema.org), avec URL absolues */
export async function videoJsonLd(projet: Projet, site: URL | undefined) {
  const { titre, video, duree, date } = projet.data;
  const poster = await getPoster(projet);
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: titre,
    description: plainText(projet),
    thumbnailUrl: new URL(poster.src, site).href,
    contentUrl: new URL(video, site).href,
    uploadDate: date.toISOString().slice(0, 10),
    duration: duree,
    inLanguage: 'fr',
    creator: { '@id': new URL('/#organisation', site).href },
  };
}
