import type { Metadata } from 'next'
import { site } from '@/content/site'
import { t, type Locale } from './i18n'

const ogLocale: Record<Locale, string> = {
  it: 'it_IT',
  en: 'en_US',
}

export function buildMetadata(locale: Locale): Metadata {
  const description = t(site.hero.subtitle, locale)

  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s | ${site.name}` },
    description,
    keywords: [...site.seo.keywords],
    openGraph: {
      title: site.name,
      description,
      url: `${site.url}/${locale}`,
      siteName: site.name,
      locale: ogLocale[locale],
      type: 'website',
      images: [{ url: site.seo.ogImage, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${site.url}/${locale}`,
      languages: {
        it: `${site.url}/it`,
        en: `${site.url}/en`,
        'x-default': `${site.url}/it`,
      },
    },
  }
}
