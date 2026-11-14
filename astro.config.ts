import { defineConfig, envField, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const fontFile = (pkg: string, file: string) => `./node_modules/@fontsource-variable/${pkg}/files/${file}`;

export default defineConfig({
  // URL publique du site (utilisée pour les URL canoniques, Open Graph et le sitemap)
  site: process.env.SITE_URL ?? 'https://mmk-prod.fr',
  output: 'static',
  // Compression HTML classique : un retour à la ligne entre du texte et une variable reste un espace
  compressHTML: true,
  trailingSlash: 'never',
  build: {
    format: 'file',
    // CSS inline : aucune feuille de style bloquante
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/merci') && !page.endsWith('/404'),
    }),
  ],
  env: {
    schema: {
      PUBLIC_FORM_ENDPOINT: envField.string({ context: 'client', access: 'public', optional: true, url: true }),
    },
  },
  // Polices auto-hébergées, sous-ensemble latin uniquement
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Source Serif 4',
      cssVariable: '--font-serif',
      fallbacks: ['Georgia', 'serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: [fontFile('source-serif-4', 'source-serif-4-latin-wght-normal.woff2')],
            weight: '600 700',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Source Sans 3',
      cssVariable: '--font-sans',
      fallbacks: ['Arial', 'sans-serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: [fontFile('source-sans-3', 'source-sans-3-latin-wght-normal.woff2')],
            weight: '400 700',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
