const ormocPhone = '09569759818';
const navalPhone = '09458353502';

/** Turns a 09XX number into a +63 link, e.g. tel:+639569759818. */
const intl = (phone: string) => `+63${phone.slice(1)}`;

export const site = {
  name: 'HL Bars',
  legalName: 'HL Builders and Related Services',
  tagline: 'Roofing & Solar Supply and Installation',
  /** Main number (Ormoc City branch), used in the header and the inquiry form. */
  phone: ormocPhone,
  phoneDisplay: '0956 975 9818',
  phoneHref: `tel:${intl(ormocPhone)}`,
  smsHref: `sms:${intl(ormocPhone)}`,
  facebook: 'https://www.facebook.com/coloredroofing',
  messenger: 'https://m.me/coloredroofing',
  hours: '7:45am to 5:00pm',
  days: 'Monday to Saturday',
  locations: [
    {
      branch: 'Ormoc City',
      address: 'HL Bars, Brgy. Cogon Combado, Aunubing St., Ormoc City 6541',
      phone: ormocPhone,
      phoneDisplay: '0956 975 9818',
      phoneHref: `tel:${intl(ormocPhone)}`,
      smsHref: `sms:${intl(ormocPhone)}`,
      map: { query: 'HL Bars, Brgy. Cogon Combado, Aunubing St., Ormoc City 6541', zoom: 15 },
    },
    {
      branch: 'Naval, Biliran',
      address: 'Sitio Riverside, Caraycaray, Naval, Biliran',
      phone: navalPhone,
      phoneDisplay: '0945 835 3502',
      phoneHref: `tel:${intl(navalPhone)}`,
      smsHref: `sms:${intl(navalPhone)}`,
      // Google Maps doesn't know Sitio Riverside, so map the barangay instead.
      map: { query: 'Caraycaray, Naval, Biliran', zoom: 14 },
    },
  ],
  branches: ['Ormoc City', 'Naval, Biliran'],
};

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Contact Us', href: '/contact' },
];
