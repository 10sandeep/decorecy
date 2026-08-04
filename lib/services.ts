export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  alt: string;
  overview: string[];
  whatWeDo: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: 'home-interiors-bhubaneswar',
    title: 'Complete Home Interiors in Bhubaneswar',
    shortTitle: 'Complete Home Interiors',
    tagline: 'End-to-end interiors designed around your lifestyle',
    description: 'Complete home interior design in Bhubaneswar covering space planning, kitchen, wardrobes, ceilings, lighting and execution end-to-end.',
    icon: 'Home',
    image:
      'https://images.pexels.com/photos/8082243/pexels-photo-8082243.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Complete home interior design by Decorecy Interiors in Bhubaneswar',
    overview: [
      'A home should feel like an extension of the people who live in it. Our complete home interior service covers every room — from the living area and kitchen to bedrooms, wardrobes and utility spaces — under one cohesive design language.',
      'We plan layouts around how your family actually moves through the day, select materials that suit the Bhubaneswar climate, and manage execution end-to-end so you do not have to coordinate multiple vendors.',
    ],
    whatWeDo: [
      { title: 'Space Planning', description: 'Layouts that balance flow, storage and natural light for every room.' },
      { title: 'Modular Kitchen', description: 'Ergonomic kitchen design with durable finishes and smart storage.' },
      { title: 'Wardrobes & Storage', description: 'Built-in wardrobes and lofts that maximise every corner.' },
      { title: 'False Ceiling & Lighting', description: 'Layered lighting and ceiling design that sets the mood.' },
      { title: 'Living & Bedroom Interiors', description: 'Furniture, finishes and styling for restful, welcoming spaces.' },
      { title: 'Execution & Handover', description: 'On-site supervision, quality checks and a clean handover.' },
    ],
    process: [
      { title: 'Consultation', description: 'We understand your lifestyle, taste and budget.' },
      { title: 'Design Concept', description: 'Layouts, 3D views and material palettes.' },
      { title: 'Execution', description: 'Carpentry, painting, electricals and finishes.' },
      { title: 'Handover', description: 'Quality check, styling and move-in ready handover.' },
    ],
    faqs: [
      {
        question: 'How long does a complete home interior project take in Bhubaneswar?',
        answer:
          'A typical 2 BHK or 3 BHK home interior project takes around 45 to 90 days from design approval, depending on scope, custom work and site readiness. We share a clear timeline before work begins.',
      },
      {
        question: 'Do you handle the entire home or only specific rooms?',
        answer:
          'We handle the entire home — kitchen, living room, bedrooms, wardrobes, false ceiling, painting, lighting and styling — so you deal with one team instead of multiple contractors.',
      },
    ],
    metaTitle: 'Complete Home Interiors in Bhubaneswar | Decorecy Interiors',
    metaDescription:
      'Transform your home with complete interior design in Bhubaneswar. Decorecy Interiors handles space planning, kitchen, wardrobes, ceilings and execution end-to-end.',
    keywords: ['home interiors bhubaneswar', 'complete home interior design'],
  },
  {
    slug: 'modular-kitchen-bhubaneswar',
    title: 'Modular Kitchen Design in Bhubaneswar',
    shortTitle: 'Modular Kitchen',
    tagline: 'Smart, durable and beautiful kitchens',
    description: 'Modular kitchen design in Bhubaneswar with ergonomic layouts, quality finishes, smart storage and appliance integration.',
    icon: 'ChefHat',
    image:
      'https://images.pexels.com/photos/6508341/pexels-photo-6508341.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modular kitchen design by Decorecy Interiors in Bhubaneswar',
    overview: [
      'The kitchen is the hardest-working room in any home. We design modular kitchens that balance storage, counter space and movement — so cooking and cleaning feel effortless.',
      'From L-shaped and U-shaped layouts to parallel and island kitchens, we choose finishes and hardware suited to Indian cooking while keeping the look clean and contemporary.',
    ],
    whatWeDo: [
      { title: 'Layout Planning', description: 'Work triangle, counter height and appliance placement.' },
      { title: 'Cabinetry & Storage', description: 'Tall units, corner solutions and pull-out organisers.' },
      { title: 'Countertops & Backsplash', description: 'Granite, quartz and easy-clean surfaces.' },
      { title: 'Hardware & Fittings', description: 'Soft-close hinges and durable channels.' },
      { title: 'Lighting', description: 'Task lighting under cabinets and ambient ceiling light.' },
      { title: 'Chimney & Hob Integration', description: 'Appliance selection and seamless fitting.' },
    ],
    process: [
      { title: 'Site Measurement', description: 'Accurate measurement of your kitchen space.' },
      { title: 'Design & 3D', description: 'Layout, finishes and 3D visualisation.' },
      { title: 'Manufacturing', description: 'Modules built in a controlled environment.' },
      { title: 'Installation', description: 'On-site fitting, appliance integration and handover.' },
    ],
    faqs: [
      {
        question: 'How much does a modular kitchen cost in Bhubaneswar?',
        answer:
          'Modular kitchen pricing depends on size, layout, finish and hardware. We share a transparent estimate after understanding your space and requirements, with options across budget ranges.',
      },
      {
        question: 'Which finishes are suitable for Indian cooking?',
        answer:
          'We recommend moisture-resistant and heat-tolerant finishes such as acrylic, laminate and PU-coated shutters, paired with strong hardware that handles daily use.',
      },
    ],
    metaTitle: 'Modular Kitchen Design in Bhubaneswar | Decorecy Interiors',
    metaDescription:
      'Get a smart, durable and beautiful modular kitchen in Bhubaneswar. Decorecy Interiors designs ergonomic kitchens with quality finishes and storage.',
    keywords: ['modular kitchen bhubaneswar', 'modular kitchen design'],
  },
  {
    slug: 'living-room-interiors-bhubaneswar',
    title: 'Living Room Design in Bhubaneswar',
    shortTitle: 'Living Room Design',
    tagline: 'Welcoming spaces for everyday living',
    description: 'Living room design in Bhubaneswar with TV units, lighting, seating and styling designed around your lifestyle.',
    icon: 'Sofa',
    image:
      'https://images.pexels.com/photos/7546323/pexels-photo-7546323.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Living room interior design by Decorecy Interiors in Bhubaneswar',
    overview: [
      'The living room is where your home makes its first impression. We design living spaces that feel open, comfortable and true to your taste — whether you prefer warm and traditional or clean and contemporary.',
      'Every element, from the TV unit and sofa to lighting and soft furnishings, is chosen to work together and suit the way your family uses the space.',
    ],
    whatWeDo: [
      { title: 'TV Unit Design', description: 'Wall-mounted, storage-integrated and floating units.' },
      { title: 'Seating Layout', description: 'Sofa and chair placement for conversation and flow.' },
      { title: 'Lighting', description: 'Ambient, task and accent lighting layers.' },
      { title: 'Wall Treatments', description: 'Panelling, paint, texture and artwork.' },
      { title: 'Storage', description: 'Display and concealed storage that stays tidy.' },
      { title: 'Styling', description: 'Cushions, rugs and decor that add warmth.' },
    ],
    process: [
      { title: 'Brief', description: 'Understand your taste and how you use the space.' },
      { title: 'Concept', description: 'Mood, palette and layout options.' },
      { title: 'Execution', description: 'Furniture, finishes and lighting installed.' },
      { title: 'Styling', description: 'Final decor and handover.' },
    ],
    faqs: [
      {
        question: 'Can you redesign only my living room?',
        answer:
          'Yes. We take up single-room projects including living rooms. We design the layout, furniture, lighting and finishes to refresh the space without a full home renovation.',
      },
    ],
    metaTitle: 'Living Room Design in Bhubaneswar | Decorecy Interiors',
    metaDescription:
      'Create a welcoming living room with Decorecy Interiors in Bhubaneswar. TV units, lighting, seating and styling designed around your lifestyle.',
    keywords: ['living room design bhubaneswar', 'living room interior'],
  },
  {
    slug: 'bedroom-interiors-bhubaneswar',
    title: 'Bedroom Interiors in Bhubaneswar',
    shortTitle: 'Bedroom Interiors',
    tagline: 'Restful rooms designed for comfort',
    description: 'Bedroom interiors in Bhubaneswar with beds, wardrobes, lighting and finishes tailored to your comfort.',
    icon: 'BedDouble',
    image:
      'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Bedroom interior design by Decorecy Interiors in Bhubaneswar',
    overview: [
      'A bedroom should help you unwind. We design bedrooms that feel calm and considered — with the right bed, wardrobe, lighting and finishes to create a restful retreat.',
      'From master bedrooms to kids rooms and guest rooms, we balance storage, comfort and style so the room works as hard as it looks good.',
    ],
    whatWeDo: [
      { title: 'Bed & Headboard', description: 'Upholstered, wooden and panelled headboards.' },
      { title: 'Wardrobe Design', description: 'Sliding and hinged wardrobes with smart storage.' },
      { title: 'Lighting', description: 'Soft ambient and reading lighting.' },
      { title: 'Study & Dressing', description: 'Compact work and dressing corners.' },
      { title: 'Wall & Ceiling', description: 'Accent walls and subtle ceiling design.' },
      { title: 'Soft Furnishings', description: 'Curtains, bedding and textiles.' },
    ],
    process: [
      { title: 'Brief', description: 'Understand your routine and taste.' },
      { title: 'Design', description: 'Layout, wardrobe and finishes.' },
      { title: 'Execution', description: 'Furniture and finishes installed.' },
      { title: 'Handover', description: 'Styling and move-in ready room.' },
    ],
    faqs: [
      {
        question: 'Do you design wardrobes along with the bedroom?',
        answer:
          'Yes. Wardrobe design is part of our bedroom interior service. We design wardrobes that fit the room layout and your storage needs, with both hinged and sliding options.',
      },
    ],
    metaTitle: 'Bedroom Interiors in Bhubaneswar | Decorecy Interiors',
    metaDescription:
      'Design restful, stylish bedrooms with Decorecy Interiors in Bhubaneswar. Beds, wardrobes, lighting and finishes tailored to your comfort.',
    keywords: ['bedroom interiors bhubaneswar', 'bedroom design'],
  },
  {
    slug: 'office-interiors-bhubaneswar',
    title: 'Office Interiors in Bhubaneswar',
    shortTitle: 'Office Interiors',
    tagline: 'Workspaces that help teams do their best',
    description: 'Office interior design in Bhubaneswar with workstations, meeting rooms, reception and execution for productive, branded workspaces.',
    icon: 'Briefcase',
    image:
      'https://images.pexels.com/photos/6794970/pexels-photo-6794970.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Office interior design by Decorecy Interiors in Bhubaneswar',
    overview: [
      'A well-designed office supports focus, collaboration and your brand. We design offices that balance function and aesthetics — from open workstations to cabins, meeting rooms and reception areas.',
      'We plan for acoustics, lighting, power and growth, so the space stays productive as your team expands.',
    ],
    whatWeDo: [
      { title: 'Workstation Layout', description: 'Open and cabin layouts for productivity.' },
      { title: 'Meeting Rooms', description: 'Acoustic, tech-ready conference spaces.' },
      { title: 'Reception & Branding', description: 'Welcoming reception with brand identity.' },
      { title: 'Lighting', description: 'Glare-free task and ambient lighting.' },
      { title: 'Storage & Pantry', description: 'Filing, storage and break-out areas.' },
      { title: 'Execution', description: 'Carpentry, electricals and furniture installation.' },
    ],
    process: [
      { title: 'Brief', description: 'Team size, workflow and brand.' },
      { title: 'Space Plan', description: 'Zoning and layout options.' },
      { title: 'Design', description: 'Look, feel and 3D views.' },
      { title: 'Execution', description: 'Build, install and handover.' },
    ],
    faqs: [
      {
        question: 'Do you design small offices as well as large ones?',
        answer:
          'Yes. We design offices of all sizes — from compact studios and co-working spaces to larger corporate floors. The approach scales to your team and budget.',
      },
    ],
    metaTitle: 'Office Interiors in Bhubaneswar | Decorecy Interiors',
    metaDescription:
      'Design productive, branded office interiors in Bhubaneswar with Decorecy Interiors. Workstations, meeting rooms, reception and execution.',
    keywords: ['office interiors bhubaneswar', 'office interior design'],
  },
  {
    slug: 'commercial-interiors-bhubaneswar',
    title: 'Commercial Interiors in Bhubaneswar',
    shortTitle: 'Commercial Interiors',
    tagline: 'Spaces that serve customers and brand',
    description: 'Commercial interior design in Bhubaneswar for retail, clinics, salons, restaurants and showrooms.',
    icon: 'Store',
    image:
      'https://images.pexels.com/photos/8135119/pexels-photo-8135119.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Commercial interior design by Decorecy Interiors in Bhubaneswar',
    overview: [
      'Retail stores, clinics, salons, restaurants and showrooms need interiors that look inviting, function efficiently and reflect the brand. We design commercial spaces that do all three.',
      'From customer flow and display to lighting and durability, we plan for the realities of a busy commercial environment.',
    ],
    whatWeDo: [
      { title: 'Customer Flow', description: 'Layouts that guide and engage visitors.' },
      { title: 'Display & Shelving', description: 'Custom display units and storage.' },
      { title: 'Lighting', description: 'Highlighting products and ambience.' },
      { title: 'Brand Identity', description: 'Colours, signage and materials on brand.' },
      { title: 'Durability', description: 'Finishes built for daily footfall.' },
      { title: 'Execution', description: 'Fast, low-disruption build and handover.' },
    ],
    process: [
      { title: 'Brief', description: 'Business type, brand and budget.' },
      { title: 'Concept', description: 'Layout and look options.' },
      { title: 'Design', description: '3D views and material selection.' },
      { title: 'Execution', description: 'Build, install and launch-ready handover.' },
    ],
    faqs: [
      {
        question: 'What types of commercial spaces do you design?',
        answer:
          'We design retail stores, clinics, salons, restaurants, cafes and showrooms across Bhubaneswar. Each project is planned around the customer experience and the demands of the business.',
      },
    ],
    metaTitle: 'Commercial Interiors in Bhubaneswar | Decorecy Interiors',
    metaDescription:
      'Design inviting, functional commercial interiors in Bhubaneswar. Decorecy Interiors handles retail, clinics, salons, restaurants and showrooms.',
    keywords: ['commercial interiors bhubaneswar', 'commercial interior design'],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceNavLinks = services.map((s) => ({
  label: s.shortTitle,
  href: `/services/${s.slug}`,
}));
