import { siteConfig } from './site-config';

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: MetadataInput) {
  const url = `${siteConfig.siteUrl}${path}`;
  const ogImage = image || `${siteConfig.siteUrl}/og-image.jpg`;
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'en_IN',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
