/**
 * Informations de la société, centralisées ici et réutilisées dans tout le site
 * (bandeau, pied de page, contact, mentions légales, données structurées…).
 * Les valeurs entre [crochets] sont à compléter.
 */
export const site = {
  name: 'MMK Production',
  legalName: 'SAS MMK Production',
  meaning: 'Movie Mais Kings',
  tagline: 'Société de production audiovisuelle',
  description:
    'SAS MMK Production, société de production audiovisuelle basée à Lyon : aftermovies, captation vidéo et reportages photo pour vos événements.',
  locale: 'fr_FR',

  email: 'contact@mmk-prod.fr',
  phone: '[06 00 00 00 00]',
  /** Numéro au format international, utilisé dans les liens tel: */
  phoneHref: '+33600000000',

  address: {
    street: '[numéro et rue]',
    postalCode: '[69000]',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    country: 'FR',
  },
  area: 'Lyon et région Auvergne-Rhône-Alpes',

  legal: {
    form: 'SAS',
    capital: '1 000 €',
    rcs: 'RCS Lyon [numéro]',
    siret: '[numéro SIRET]',
    vat: '[numéro de TVA intracommunautaire]',
    director: 'Antoine Chataignier',
    host: {
      name: '[Hébergeur, ex. Cloudflare, Inc.]',
      address: '[adresse de l’hébergeur]',
      website: '[https://…]',
    },
  },

  social: {
    instagram: 'https://www.instagram.com/[compte]',
  },

  /** Showreel du haut de page */
  showreel: {
    provider: 'youtube' as const,
    id: '[ID_VIDEO]',
    title: 'Showreel MMK Production',
  },

  /** Identifiant de la bibliothèque Bunny Stream (si vous utilisez Bunny) */
  bunnyLibraryId: '[ID_BIBLIOTHEQUE]',
};

export const nav = [
  { label: 'La société', href: '/#societe' },
  { label: 'Prestations', href: '/#prestations' },
  { label: 'Réalisations', href: '/#realisations' },
  { label: 'Équipe', href: '/#equipe' },
];

export const formattedAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
