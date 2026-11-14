/**
 * Informations de la société, centralisées ici et réutilisées dans tout le site
 * (bandeau, pied de page, contact, mentions légales, données structurées…).
 */
export const site = {
  name: 'MMK Production',
  legalName: 'MMK Production',
  description:
    'MMK Production, basée à Chavanay : aftermovies, captations et formats courts pour vos événements à Lyon, Saint-Étienne, en Ardèche et alentours.',
  locale: 'fr_FR',

  email: 'contact@mmk-prod.fr',
  /** Ville où l'équipe est basée (pas d'adresse précise publiée) */
  base: { city: 'Chavanay', postalCode: '42410', region: 'Auvergne-Rhône-Alpes', country: 'FR' },
  /** Zone d'intervention, affichée sur le site */
  area: 'Lyon, Saint-Étienne, Ardèche et alentours',
  /** Zone d'intervention détaillée, pour les données structurées */
  areaServed: [
    { '@type': 'City', name: 'Lyon' },
    { '@type': 'City', name: 'Saint-Étienne' },
    { '@type': 'City', name: 'Vienne' },
    { '@type': 'AdministrativeArea', name: 'Ardèche' },
    { '@type': 'AdministrativeArea', name: 'Loire' },
    { '@type': 'AdministrativeArea', name: 'Isère' },
    { '@type': 'AdministrativeArea', name: 'Rhône' },
    { '@type': 'AdministrativeArea', name: 'Drôme' },
  ],

  legal: {
    /** Responsable de la publication (pas encore de société immatriculée) */
    director: 'Antoine Chataignier',
    host: {
      name: 'GitHub, Inc. (GitHub Pages)',
      address: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis',
      website: 'https://github.com',
    },
  },

  /** Haut de page : boucle muette en fond (courte et légère) + film complet ouvert au clic (fichiers dans public/videos/) */
  showreel: {
    loop: '/videos/hero-boucle.mp4',
    video: '/videos/rencontres-cinema-beaurepaire-2025.mp4',
    title: 'Aftermovie des 37es Rencontres du cinéma de Beaurepaire',
  },
};

export const nav = [
  { label: 'La société', href: '/#societe' },
  { label: 'Prestations', href: '/#prestations' },
  { label: 'Réalisations', href: '/#realisations' },
];
