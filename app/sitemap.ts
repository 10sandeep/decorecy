import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { services } from '@/lib/services';
import { projects } from '@/lib/projects';
import { blogPosts } from '@/lib/blog';
import { designIdeaCategories } from '@/lib/design-ideas';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date();

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/design-ideas',
    '/blog',
    '/contact',
    '/best-interior-designers-in-bhubaneswar',
    '/privacy-policy',
    '/terms',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projects
    .filter((p) => p.published)
    .map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  const blogRoutes = blogPosts
    .filter((p) => p.published)
    .map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  const designIdeaRoutes = designIdeaCategories.map((c) => ({
    url: `${base}/design-ideas/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...designIdeaRoutes,
  ];
}
