import type { Metadata, MetadataRoute } from 'next';

const SITE_NAME = 'Wabi Portfolio';
const SITE_AUTHOR = 'Wabi Dagim';
const SOCIAL_IMAGE_PATH = '/images/og-image.png';
const SITE_DESCRIPTION =
  'Wabi Dagim | Full-Stack Developer specializing in high-performance React applications, scalable backend systems, and cutting-edge AI integrations.';
const SITE_SOCIAL_DESCRIPTION =
  'Explore the portfolio of Wabi Dagim, featuring premium web experiences, robust architecture, and innovative AI solutions.';
const SITE_KEYWORDS = [
  'Wabi Dagim',
  'Wabi portfolio',
  'full-stack developer',
  'frontend engineer',
  'backend development',
  'frontend developer',
  'Next.js portfolio',
  'React developer',
  'Tailwind CSS',
  'Node.js',
  'TypeScript',
  'portfolio website',
  'AI integrations',
];

const ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/resume', changeFrequency: 'monthly', priority: 0.8 },
] as const satisfies Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}>;

function normalizeSiteUrl(url?: string) {
  if (!url) {
    return undefined;
  }

  const trimmedUrl = url.trim().replace(/\/+$/, '');

  if (!trimmedUrl) {
    return undefined;
  }

  return trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')
    ? trimmedUrl
    : `https://${trimmedUrl}`;
}

function resolveSiteUrl() {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.VERCEL_URL ??
      'https://portfolio-wabihashs-projects.vercel.app'
  );
}

export const siteUrl = resolveSiteUrl();
export const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
export const socialImage = metadataBase ? SOCIAL_IMAGE_PATH : undefined;

type PageMetadataConfig = {
  title: string;
  description: string;
  path: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataConfig): Metadata {
  return {
    title,
    description,
    alternates: metadataBase ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      ...(socialImage
        ? { images: [{ url: socialImage, alt: `${SITE_NAME} preview` }] }
        : {}),
    },
    twitter: {
      card: socialImage ? 'summary_large_image' : 'summary',
      title,
      description,
      creator: '@AgituG632',
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

export const rootMetadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  category: 'technology',
  metadataBase,
  alternates: metadataBase ? { canonical: '/' } : undefined,
  openGraph: {
    title: SITE_NAME,
    description: SITE_SOCIAL_DESCRIPTION,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: '/',
    ...(socialImage
      ? { images: [{ url: socialImage, alt: `${SITE_NAME} preview` }] }
      : {}),
  },
  twitter: {
    card: socialImage ? 'summary_large_image' : 'summary',
    title: SITE_NAME,
    description: SITE_SOCIAL_DESCRIPTION,
    creator: '@AgituG632',
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function buildRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
    host: siteUrl,
  };
}

export function buildSitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) {
    return [];
  }

  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
