# MMK Production — site vitrine

Site statique Astro (TypeScript strict, sans framework UI) de la SAS MMK Production.

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # vérification TypeScript (astro check) + build dans dist/
pnpm preview   # sert dist/ en local
```

(`npm run dev` / `npm run build` fonctionnent aussi.)

## Modifier les infos de la société

Tout est centralisé dans **`src/config/site.ts`** : e-mail, téléphone, adresse, RCS/SIRET/TVA, hébergeur,
réseaux sociaux, ID du showreel, bibliothèque Bunny Stream. Les valeurs entre `[crochets]` sont à compléter.
Les textes de la page d'accueil (présentation, prestations, bios) sont dans `src/pages/index.astro`,
les photos des associés dans `src/assets/equipe/`.

## Ajouter un projet (réalisation)

1. Déposer les images dans `src/assets/projets/` (vignette) et `src/assets/galerie/` (photos), en JPG/PNG
   haute définition : elles sont converties automatiquement en AVIF + WebP aux bonnes tailles.
2. Créer `src/content/projets/mon-projet.md` (le nom du fichier devient l'URL `/realisations/mon-projet`) :

```md
---
titre: "Gala annuel 2026"
client: "Nom du client"
lieu: "Lyon"
date: 2026-11-20
type: aftermovie            # video | photo | aftermovie | video-photo
vignette: ../../assets/projets/gala.jpg
vignetteAlt: "Invités sur la piste de danse"   # optionnel
videoId: "abc123XYZ"        # optionnel : ID YouTube ou ID de vidéo Bunny Stream
provider: youtube           # optionnel : youtube (défaut) | bunny
galerie:                    # optionnel
  - ../../assets/galerie/gala-1.jpg
  - ../../assets/galerie/gala-2.jpg
---

Texte de présentation du projet (Markdown).
```

Les 3 projets les plus récents (selon `date`) s'affichent sur l'accueil ; tous sont listés sur `/realisations`.

## Configurer le formulaire de contact

Le formulaire est du HTML pur (aucun JS). Copier `.env.example` en `.env` (ou définir les variables chez l'hébergeur) :

| Service   | Variables                                                                                  |
| --------- | ------------------------------------------------------------------------------------------ |
| Web3Forms | `PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit` et `PUBLIC_FORM_ACCESS_KEY=<clé>` |
| Formspree | `PUBLIC_FORM_ENDPOINT=https://formspree.io/f/<id>`                                         |

Le champ anti-spam (honeypot) s'adapte au service (`botcheck` pour Web3Forms, `_gotcha` pour Formspree).
Avec Web3Forms, le visiteur est redirigé vers `/merci` après l'envoi. Sans variable définie, le formulaire
ouvre le logiciel de messagerie du visiteur (repli `mailto:`). Les variables sont lues **au build** : il faut rebuilder après modification.

## Déployer

Le site est 100 % statique (dossier `dist/`).

- **Cloudflare Pages** ou **Netlify** : commande de build `pnpm build`, dossier de sortie `dist`, Node 22.12 minimum.
  Définir `SITE_URL` (ex. `https://mmk-prod.fr`) et les variables du formulaire.
- Les pages sont générées en `page.html` et servies sans extension (`/mentions-legales`) par ces deux hébergeurs.

## Notes techniques

- Polices auto-hébergées (API Fonts d'Astro + fichiers `@fontsource-variable`, sous-ensemble latin, `font-display: swap`,
  preload de Source Serif 4, polices de repli aux métriques ajustées pour limiter le CLS).
- Vidéos : composant `VideoFacade` — image d'aperçu + bouton ; l'iframe (youtube-nocookie ou Bunny Stream) n'est
  injectée qu'au clic. C'est le seul JS du site (~0,5 Ko inline). Sans JS, le bouton renvoie vers la vidéo.
- Galerie : lightbox en `<dialog>` natif ouvert via les attributs HTML `command` / `commandfor`, sans JavaScript.
- `_sources/` contient les logos d'origine (non publiés). `src/assets/logo-mmk.webp`, `public/favicon.png`,
  `public/apple-touch-icon.png`, `public/logo-mmk.png` (JSON-LD) et `public/og-image.jpg` en sont dérivés.
