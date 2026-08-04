import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CTASection } from '@/components/CTASection';
import { StructuredData } from '@/components/StructuredData';
import { BlogCard, BlogEmptyState } from '@/components/BlogCard';
import { getPublishedBlogPosts, blogCategories } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Interior Design Blog — Guides & Ideas for Bhubaneswar Homes',
  description:
    'Read in-depth guides on interior design, modular kitchens, home renovation and space planning for homes and offices in Bhubaneswar.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getPublishedBlogPosts();

  return (
    <>
      <StructuredData data={websiteSchema()} />
      <section className="pt-28 lg:pt-36 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}
          />
          <div className="mt-6 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Blog
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">
              Interior Design Guides & Ideas
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Practical, in-depth articles on interior design, modular kitchens,
              renovation and space planning — written for homeowners in
              Bhubaneswar.
            </p>
          </div>

          {posts.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              {blogCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <BlogEmptyState />
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
