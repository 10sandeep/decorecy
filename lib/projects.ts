export type ProjectCategory =
  | 'Full Home'
  | 'Kitchen'
  | 'Living Room'
  | 'Bedroom'
  | 'Office'
  | 'Commercial';

export type Project = {
  slug: string;
  name: string;
  location: string;
  area: string;
  propertyType: string;
  designStyle: string;
  category: ProjectCategory;
  services: string[];
  description: string;
  image: string;
  alt: string;
  gallery: { src: string; alt: string }[];
  published: boolean;
};

export const projectCategories: ProjectCategory[] = [
  'Full Home',
  'Kitchen',
  'Living Room',
  'Bedroom',
  'Office',
  'Commercial',
];

export const projects: Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.published && p.category === category);
}
