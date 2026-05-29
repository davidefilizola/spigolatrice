import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { locales } from '@/core/lib/i18n'

/**
 * Sitemap XML auto-generata.
 * Include: home + /case/{slug} × 3 + /galleria + /quartiere + /faq + /cripto (it) | /crypto (en)
 * per ogni locale, con alternates hreflang.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Helper: aggiungi una pagina con alternate hreflang per le altre lingue
  function addPage(path: (l: 'it' | 'en') => string, priority: number, freq: MetadataRoute.Sitemap[number]['changeFrequency']) {
    for (const locale of locales) {
      entries.push({
        url: `${site.url}${path(locale)}`,
        lastModified,
        changeFrequency: freq,
        priority,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${path(l)}`])),
        },
      })
    }
  }

  // Home
  addPage((l) => `/${l}`, 1.0, 'weekly')

  // Pagine case (3 × 2 locali = 6 entries)
  for (const property of site.properties) {
    addPage((l) => `/${l}/case/${property.slug}`, 0.9, 'monthly')
  }

  // Galleria
  addPage((l) => `/${l}/galleria`, 0.6, 'monthly')

  // Quartiere
  addPage((l) => `/${l}/quartiere`, 0.7, 'monthly')

  // FAQ
  addPage((l) => `/${l}/faq`, 0.5, 'monthly')

  // Cripto / Crypto
  addPage((l) => (l === 'it' ? '/it/cripto' : '/en/crypto'), 0.7, 'monthly')

  return entries
}
