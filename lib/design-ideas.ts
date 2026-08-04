export type DesignIdeaCategory = {
  slug: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};

export type DesignIdea = {
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const designIdeaCategories: DesignIdeaCategory[] = [
  {
    slug: 'living-room',
    name: 'Living Room',
    description: 'Living room design ideas — layouts, TV units, lighting and styling.',
    image:
      'https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern living room interior design ideas in Bhubaneswar',
  },
  {
    slug: 'bedroom',
    name: 'Bedroom',
    description: 'Bedroom design ideas — beds, wardrobes, lighting and finishes.',
    image:
      'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modern bedroom interior design ideas in Bhubaneswar',
  },
  {
    slug: 'kitchen',
    name: 'Kitchen',
    description: 'Modular kitchen design ideas — layouts, finishes and storage.',
    image:
      'https://images.pexels.com/photos/7018836/pexels-photo-7018836.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Modular kitchen design ideas in Bhubaneswar',
  },
  {
    slug: 'dining-room',
    name: 'Dining Room',
    description: 'Dining room ideas — tables, lighting and ambience.',
    image:
      'https://images.pexels.com/photos/14598479/pexels-photo-14598479.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Dining room interior design ideas in Bhubaneswar',
  },
  {
    slug: 'wardrobe',
    name: 'Wardrobe',
    description: 'Wardrobe design ideas — sliding, hinged and walk-in wardrobes.',
    image:
      'https://images.pexels.com/photos/6580395/pexels-photo-6580395.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Wardrobe design ideas in Bhubaneswar',
  },
  {
    slug: 'tv-unit',
    name: 'TV Unit',
    description: 'TV unit design ideas — wall-mounted, storage and floating units.',
    image:
      'https://images.pexels.com/photos/7166934/pexels-photo-7166934.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'TV unit design ideas in Bhubaneswar',
  },
  {
    slug: 'false-ceiling',
    name: 'False Ceiling',
    description: 'False ceiling design ideas — lighting and ceiling profiles.',
    image:
      'https://images.pexels.com/photos/19840855/pexels-photo-19840855.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'False ceiling design ideas in Bhubaneswar',
  },
  {
    slug: 'office',
    name: 'Office',
    description: 'Office design ideas — workstations, cabins and meeting rooms.',
    image:
      'https://images.pexels.com/photos/36631701/pexels-photo-36631701.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Office interior design ideas in Bhubaneswar',
  },
];

export const designIdeas: DesignIdea[] = [
  {
    slug: 'minimalist-living-room',
    category: 'living-room',
    title: 'Minimalist Living Room',
    description: 'Clean lines, neutral tones and layered lighting for a calm living room.',
    image:
      'https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Minimalist living room interior design in Bhubaneswar',
  },
  {
    slug: 'warm-bedroom-palette',
    category: 'bedroom',
    title: 'Warm Bedroom Palette',
    description: 'Soft wood tones and warm lighting for a restful bedroom.',
    image:
      'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Warm bedroom interior design in Bhubaneswar',
  },
  {
    slug: 'l-shaped-modular-kitchen',
    category: 'kitchen',
    title: 'L-Shaped Modular Kitchen',
    description: 'An efficient L-shaped layout with smart corner storage.',
    image:
      'https://images.pexels.com/photos/7018836/pexels-photo-7018836.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'L-shaped modular kitchen design in Bhubaneswar',
  },
  {
    slug: 'marble-dining-room',
    category: 'dining-room',
    title: 'Marble Dining Room',
    description: 'A marble table with statement lighting for elegant dining.',
    image:
      'https://images.pexels.com/photos/14598479/pexels-photo-14598479.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Marble dining room interior design in Bhubaneswar',
  },
  {
    slug: 'walk-in-wardrobe',
    category: 'wardrobe',
    title: 'Walk-in Wardrobe',
    description: 'A bright walk-in wardrobe with open shelving and ambient lighting.',
    image:
      'https://images.pexels.com/photos/6580395/pexels-photo-6580395.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Walk-in wardrobe design in Bhubaneswar',
  },
  {
    slug: 'floating-tv-unit',
    category: 'tv-unit',
    title: 'Floating TV Unit',
    description: 'A wall-mounted floating TV unit with wooden textures.',
    image:
      'https://images.pexels.com/photos/7166934/pexels-photo-7166934.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Floating TV unit design in Bhubaneswar',
  },
  {
    slug: 'geometric-false-ceiling',
    category: 'false-ceiling',
    title: 'Geometric False Ceiling',
    description: 'Geometric ceiling panels with integrated lighting.',
    image:
      'https://images.pexels.com/photos/19840855/pexels-photo-19840855.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Geometric false ceiling design in Bhubaneswar',
  },
  {
    slug: 'open-plan-office',
    category: 'office',
    title: 'Open Plan Office',
    description: 'A bright open-plan office with plants and contemporary design.',
    image:
      'https://images.pexels.com/photos/36631701/pexels-photo-36631701.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Open plan office interior design in Bhubaneswar',
  },
];

export function getDesignIdeaCategoryBySlug(slug: string) {
  return designIdeaCategories.find((c) => c.slug === slug);
}

export function getDesignIdeasByCategory(slug: string) {
  return designIdeas.filter((d) => d.category === slug);
}
