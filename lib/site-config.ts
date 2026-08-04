export const siteConfig = {
  name: 'Decorecy Interiors',
  shortName: 'Decorecy',
  tagline: 'Interior Design Studio',
  city: 'Bhubaneswar',
  state: 'Odisha',
  country: 'India',
  siteUrl: 'https://decorecyinteriors.com',
  description:
    'Decorecy Interiors is a Bhubaneswar-based interior design studio creating personalized, functional and beautiful residential and commercial interiors across the city.',
  email: 'hello@decorecyinteriors.com',
  phone: '+91 90000 00000',
  phoneHref: '+919000000000',
  whatsapp: '919000000000',
  address: {
    street: 'Address to be updated',
    locality: 'Bhubaneswar',
    region: 'Odisha',
    postalCode: '751001',
    country: 'IN',
  },
  businessHours: [
    { day: 'Monday – Friday', hours: '10:00 AM – 7:00 PM' },
    { day: 'Saturday', hours: '10:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'By appointment' },
  ],
  social: {
    instagram: 'https://instagram.com/decorecyinteriors',
    facebook: 'https://facebook.com/decorecyinteriors',
    pinterest: 'https://pinterest.com/decorecyinteriors',
    youtube: 'https://youtube.com/@decorecyinteriors',
  },
  areasServed: [
    'Patia',
    'Khandagiri',
    'Jaydev Vihar',
    'Saheed Nagar',
    'Nayapalli',
    'Chandrasekharpur',
    'Rasulgarh',
    'Old Town',
    'Jagamara',
    'Kalinga Nagar',
  ],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Design Ideas', href: '/design-ideas' },
    { label: 'Why Decorecy', href: '/#why-decorecy' },
    { label: 'Contact', href: '/contact' },
  ],
  whatsappMessage:
    "Hi Decorecy Interiors, I'm looking for interior design services in Bhubaneswar. I'd like to schedule a consultation.",
};

export type SiteConfig = typeof siteConfig;
