import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { locales } from '@/core/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === 'it' ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`])),
    },
  }))
}
