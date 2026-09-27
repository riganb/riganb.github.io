import type { MetadataRoute } from 'next'
import { sitemapEntries } from '@/lib/structured-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries().map((entry) => ({ ...entry, changeFrequency: 'monthly' }))
}
