import { isValidLocale, type Locale } from '@/core/lib/i18n'
import { notFound } from 'next/navigation'
import { site } from '@/content/site'
import Hero from '@/templates/informative/Hero'
import About from '@/templates/informative/About'
import Properties from '@/templates/informative/Properties'
import Gallery from '@/core/components/Gallery'
import CTA from '@/core/components/CTA'
import FAQ from '@/core/components/FAQ'
import Contact from '@/core/components/Contact'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const validLocale = locale as Locale

  // JSON-LD: LocalBusiness + 3 LodgingBusiness inside
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    url: `${site.url}/${validLocale}`,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address,
      addressLocality: 'Milano',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.contact.coordinates.lat,
      longitude: site.contact.coordinates.lng,
    },
    image: `${site.url}${site.seo.ogImage}`,
    sameAs: [site.social.instagram, site.social.facebook, site.social.airbnbHost].filter(Boolean),
    department: site.properties.map((p) => ({
      '@type': 'LodgingBusiness',
      name: `${p.name.it} · ${site.name}`,
      url: `${site.url}/${validLocale}/case/${p.slug}`,
      image: `${site.url}${p.heroImage}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: p.address,
        addressLocality: 'Milano',
        addressCountry: 'IT',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: p.ratings.overall,
        reviewCount: p.ratings.count,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero locale={validLocale} />
      <Properties locale={validLocale} />
      <About locale={validLocale} />
      <Gallery locale={validLocale} />
      <CTA locale={validLocale} />
      <FAQ locale={validLocale} />
      <Contact locale={validLocale} />
    </>
  )
}
