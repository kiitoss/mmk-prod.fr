# MMK Production : site vitrine

Site statique Astro (TypeScript strict, sans framework UI) de MMK Production.

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # vérification TypeScript (astro check) + build dans dist/
pnpm preview   # sert dist/ en local
```

(`npm run dev` / `npm run build` fonctionnent aussi.)

## Modifier les informations du site

Tout est centralisé dans **`src/config/site.ts`** : nom, e-mail, zone d'intervention, responsable de la
publication, hébergeur, vidéo du haut de page. Les valeurs entre `[crochets]` sont à compléter.
Les textes de la page d'accueil (présentation, prestations) sont dans `src/pages/index.astro`.
À la création de la société, ajouter forme juridique, capital, RCS/SIRET, TVA et adresse dans les mentions légales
(`src/pages/mentions-legales.astro`).

## Ajouter une réalisation

Le site tient sur une seule page : les réalisations s'affichent directement dans la section « Réalisations »
de l'accueil, de la plus récente à la plus ancienne, avec leur vidéo.

1. Encoder la vidéo en MP4 H.264 optimisé pour le web, puis la déposer dans `public/videos/` :

   ```bash
   ffmpeg -i source.mp4 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/videos/mon-projet.mp4
   ```

   Pour n'en garder qu'un extrait, ajouter `-ss 25:40 -t 180` (début et durée) avant `-i`.
   GitHub Pages refuse les fichiers de plus de 100 Mo : viser moins de 20 Mo par vidéo.
2. Extraire une image d'aperçu dans `src/assets/projets/` :
   `ffmpeg -ss 23 -i source.mp4 -frames:v 1 -q:v 1 src/assets/projets/mon-projet.jpg`
3. Créer `src/content/projets/mon-projet.md` :

```md
---
titre: "Gala annuel 2026"
type: aftermovie            # aftermovie | captation | reel
client: "Nom du client"     # optionnel
lieu: "Saint-Étienne"       # optionnel
date: 2026-11-20
video: /videos/mon-projet.mp4
duree: PT1M30S              # durée ISO 8601 (données structurées et sitemap vidéo)
poster: ../../assets/projets/mon-projet.jpg
vertical: false             # true pour un format 9:16 (reel)
lien:                       # optionnel
  url: "https://www.youtube.com/watch?v=..."
  label: "Voir la version complète"
---

Courte présentation du projet (Markdown).
```

## Configurer le formulaire de contact

Le formulaire est envoyé à **[Formspree](https://formspree.io)** (gratuit jusqu'à 50 demandes par mois, sans carte bancaire).

1. Créer un compte Formspree avec `contact@mmk-prod.fr`, puis un formulaire (« New form »).
2. Copier son URL (`https://formspree.io/f/<id>`) dans la variable `PUBLIC_FORM_ENDPOINT`
   (fichier `.env` en local, variable de dépôt GitHub pour la production, voir plus bas).
3. Conseillé : dans les réglages du formulaire, restreindre les domaines autorisés à `mmk-prod.fr`.

Le formulaire est envoyé en arrière-plan (petit script inline) puis redirige vers `/merci` : la redirection native
de Formspree est réservée aux offres payantes. Sans JavaScript, l'envoi fonctionne quand même et Formspree affiche
sa propre page de confirmation. Le champ anti-spam (honeypot) `_gotcha` est en place.
Sans variable définie, le formulaire ouvre le logiciel de messagerie du visiteur (repli `mailto:`).
Les variables sont lues **au build** : il faut rebuilder après modification.

## Déployer (GitHub Pages)

Le site est 100 % statique (dossier `dist/`) et déployé par le workflow `.github/workflows/deploy.yml`
à chaque push sur `main`.

1. Dans le dépôt GitHub : **Settings > Pages > Source : GitHub Actions**.
2. **Settings > Secrets and variables > Actions > Variables** : ajouter `PUBLIC_FORM_ENDPOINT`
   (et `SITE_URL` si le domaine n'est pas `https://mmk-prod.fr`).
3. Domaine personnalisé : le fichier `public/CNAME` contient `mmk-prod.fr`. Côté registrar, faire pointer
   le domaine vers GitHub Pages (enregistrements A/AAAA de GitHub, ou CNAME vers `<compte>.github.io` pour `www`),
   puis cocher **Enforce HTTPS** dans Settings > Pages.

Les pages sont générées en `page.html` et GitHub Pages les sert sans extension (`/mentions-legales`).

## Notes techniques

- Polices auto-hébergées (API Fonts d'Astro + fichiers `@fontsource-variable`, sous-ensemble latin, `font-display: swap`,
  preload de Source Serif 4, polices de repli aux métriques ajustées pour limiter le CLS).
- Vidéos : hébergées sur le site (`<video preload="none">`, sans lecteur tiers), rien n'est téléchargé avant la lecture.
- Référencement : données structurées `ProfessionalService` (Chavanay, zone d'intervention) et `VideoObject` par
  réalisation, sitemap vidéo `/sitemap-videos.xml` déclaré dans `robots.txt`.
- Le seul JavaScript du site est l'envoi du formulaire (script inline de quelques centaines d'octets).
- `_sources/` contient les logos d'origine (non publiés). `src/assets/logo-mmk.webp`, `public/favicon.png`,
  `public/apple-touch-icon.png`, `public/logo-mmk.png` (JSON-LD) et `public/og-image.jpg` en sont dérivés.
