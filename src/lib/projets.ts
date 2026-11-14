import { getCollection, type CollectionEntry } from 'astro:content';

export type Projet = CollectionEntry<'projets'>;

export const typeLabels: Record<Projet['data']['type'], string> = {
  video: 'Vidéo',
  photo: 'Photo',
  aftermovie: 'Aftermovie',
  'video-photo': 'Vidéo & photo',
};

/** Tous les projets, du plus récent au plus ancien */
export async function getProjets(): Promise<Projet[]> {
  const projets = await getCollection('projets');
  return projets.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
