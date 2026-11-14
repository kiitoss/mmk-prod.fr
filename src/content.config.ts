import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      client: z.string(),
      lieu: z.string(),
      date: z.coerce.date(),
      type: z.enum(['video', 'photo', 'aftermovie', 'video-photo']),
      vignette: image(),
      /** Texte alternatif de la vignette (par défaut : le titre) */
      vignetteAlt: z.string().optional(),
      videoId: z.string().optional(),
      provider: z.enum(['youtube', 'bunny']).optional(),
      galerie: z.array(image()).optional(),
    }),
});

export const collections = { projets };
