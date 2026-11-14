import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      type: z.enum(['aftermovie', 'captation', 'reel']),
      client: z.string().optional(),
      lieu: z.string().optional(),
      date: z.coerce.date(),
      /** Fichier vidéo dans public/, ex. /videos/mon-projet.mp4 (H.264, faststart) */
      video: z.string().startsWith('/videos/'),
      /** Durée de la vidéo au format ISO 8601, ex. PT1M12S (données structurées) */
      duree: z.string().regex(/^PT(\d+H)?(\d+M)?(\d+S)?$/),
      /** Image affichée avant la lecture */
      poster: image(),
      /** Vidéo verticale (format reel 9:16) */
      vertical: z.boolean().default(false),
      /** Lien externe facultatif, ex. la version complète sur YouTube */
      lien: z.object({ url: z.url(), label: z.string() }).optional(),
    }),
});

export const collections = { projets };
