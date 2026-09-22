import { url } from '../url.js';

/**
 * Company details, in one place. Everything here comes from the previous
 * 1stcrane.co.za site; change it here and every page follows.
 */
export const SITE = {
  name: '1st Crane',
  brand: '1st Crane Mining & Transport',
  legalName: '1st Crane, Rigging & Transport (Pty) Ltd',
  founded: 2012,
  url: 'https://www.1stcrane.co.za',
  phone: { display: '084 834 9417', href: 'tel:+27848349417' },
  fax: '086 605 7277',
  email: 'info@1stcranehire.co.za',
  address: {
    street: '79 Constantia Avenue',
    suburb: 'Mnandi',
    city: 'Centurion',
    region: 'Pretoria, Gauteng',
    country: 'South Africa',
  },
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('79 Constantia Avenue, Mnandi, Centurion, South Africa'),
  availability: 'Cranes available 24/7',
  // Linked from the old site's footer.
  facebook: 'https://www.facebook.com/clinten.zavvy/',
  instagram: { href: 'https://www.instagram.com/rigging2025/', handle: '@rigging2025' },

  /* Where the contact form sends enquiries. With no access key the form falls
     back to opening the visitor's email app with the message filled in.
     For direct delivery to the inbox, create a free key at web3forms.com
     (it is tied to the address it emails) and paste it below. */
  form: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '',
  },
};

export const NAV = [
  { id: 'about', href: url('/aboutus/'), label: 'About' },
  { id: 'services', href: url('/services/'), label: 'Services' },
  { id: 'fleet', href: url('/fleet/'), label: 'Fleet' },
  { id: 'for-sale', href: url('/for-sale/'), label: 'For sale' },
  { id: 'gallery', href: url('/gallery/'), label: 'Gallery' },
  { id: 'contact', href: url('/contact-us/'), label: 'Contact' },
];

export const QUOTE_HREF = url('/contact-us/');

/** Facts used by the stat rows. No numbers here that the old site didn't state. */
export const STATS = [
  { icon: 'calendar', value: String(SITE.founded), label: 'Established. Owner-run and managed' },
  { icon: 'clock', value: '24/7', label: 'Cranes available, day or night' },
  { icon: 'layers', value: '17', label: 'Lifting, rigging and transport services' },
  { icon: 'crane', value: '4', label: 'Crane types: all-terrain, rough-terrain, Franna and truck-mounted' },
];
