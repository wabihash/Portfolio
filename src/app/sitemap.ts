import type { MetadataRoute } from 'next';
import { buildSitemap } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}
