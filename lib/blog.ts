export type BlogCategory =
  | 'Interior Design'
  | 'Home Decor'
  | 'Modular Kitchen'
  | 'Space Planning'
  | 'Renovation'
  | 'Bhubaneswar Design Guides';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string;
  readingTime: string;
  image: string;
  alt: string;
  content: { heading?: string; paragraphs?: string[]; list?: string[] }[];
  published: boolean;
};

export const blogCategories: BlogCategory[] = [
  'Interior Design',
  'Home Decor',
  'Modular Kitchen',
  'Space Planning',
  'Renovation',
  'Bhubaneswar Design Guides',
];

export const blogPosts: BlogPost[] = [];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPublishedBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.published);
}
