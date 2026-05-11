import { siteUrl } from '@/lib/metadata';
import { SOCIAL_LINKS } from '@/shared/constants/socialLinks';

function safeJsonLd(value: unknown): { __html: string } {
  return { __html: JSON.stringify(value) };
}

export function StructuredData() {
  const baseUrl = siteUrl ?? '';
  const socials = SOCIAL_LINKS.filter((link) => link.id === 'x' || link.id === 'telegram')
    .map((link) => link.href)
    .filter(Boolean);

  const websiteId = baseUrl ? `${baseUrl}#website` : undefined;
  const personId = baseUrl ? `${baseUrl}#person` : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: baseUrl || '/',
        name: 'Wabi Portfolio',
        inLanguage: 'en',
        publisher: personId ? { '@id': personId } : undefined,
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Wabi Dagim',
        url: baseUrl || '/',
        jobTitle: 'Full-Stack Developer',
        sameAs: socials.length ? socials : undefined,
      },
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // Next.js will escape the string; JSON.stringify keeps it valid.
      dangerouslySetInnerHTML={safeJsonLd(jsonLd)}
    />
  );
}
