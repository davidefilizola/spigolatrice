import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Container from '@/core/components/Container'
import Section from '@/core/components/Section'
import { site } from '@/content/site'
import { locales, isValidLocale, t, type Locale } from '@/core/lib/i18n'
import PropertyGallery from './PropertyGallery'

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    for (const property of site.properties) {
      params.push({ locale, slug: property.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  const property = site.properties.find((p) => p.slug === slug)
  if (!property) return {}
  const validLocale = locale as Locale
  const title = `${t(property.name, validLocale)} · ${property.address}`
  const description = t(property.tagline, validLocale)
  return {
    title,
    description,
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url: `${site.url}/${locale}/case/${slug}`,
      images: [{ url: property.heroImage, width: 1600, height: 900 }],
      type: 'website',
    },
    alternates: {
      canonical: `${site.url}/${locale}/case/${slug}`,
      languages: {
        it: `${site.url}/it/case/${slug}`,
        en: `${site.url}/en/case/${slug}`,
      },
    },
  }
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) notFound()
  const property = site.properties.find((p) => p.slug === slug)
  if (!property) notFound()
  const validLocale = locale as Locale

  // JSON-LD per ogni casa: LodgingBusiness
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: `${t(property.name, validLocale)} · ${site.name}`,
    image: `${site.url}${property.heroImage}`,
    priceRange: '€80–€200',
    address: { '@type': 'PostalAddress', streetAddress: property.address, addressLocality: 'Milano', addressCountry: 'IT' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: property.ratings.overall,
      reviewCount: property.ratings.count,
      bestRating: 5,
      worstRating: 1,
    },
    url: `${site.url}/${validLocale}/case/${property.slug}`,
    telephone: site.contact.phone,
    sameAs: [property.airbnbUrl],
  }

  const otherProperties = site.properties.filter((p) => p.slug !== property.slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[65vh] sm:h-[75vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={property.heroImage}
            alt={t(property.name, validLocale)}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" />
        </div>
        <Container className="relative pb-12 sm:pb-20 text-white">
          <Link
            href={`/${validLocale}/#case`}
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {validLocale === 'it' ? 'Tutte le case' : 'All apartments'}
          </Link>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 mb-3">
            {property.address}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] -tracking-tight max-w-3xl">
            {t(property.name, validLocale)}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/90 max-w-2xl">
            {t(property.tagline, validLocale)}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 fill-amber-300" viewBox="0 0 20 20">
                <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9z" />
              </svg>
              <span className="tabular-nums font-medium">
                {property.ratings.overall.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-white/70">·</span>
              <span className="text-white/80">
                {property.ratings.count} {validLocale === 'it' ? 'recensioni' : 'reviews'}
              </span>
            </span>
            <span className="text-white/40">·</span>
            <span>
              {property.features.guests} {validLocale === 'it' ? 'ospiti' : 'guests'}
            </span>
            <span className="text-white/40">·</span>
            <span>
              {property.features.bedrooms} {validLocale === 'it' ? (property.features.bedrooms === 1 ? 'camera' : 'camere') : (property.features.bedrooms === 1 ? 'bedroom' : 'bedrooms')}
            </span>
            {property.features.sqm && (
              <>
                <span className="text-white/40">·</span>
                <span>{property.features.sqm} m²</span>
              </>
            )}
            {property.features.outdoor && (
              <>
                <span className="text-white/40">·</span>
                <span>{t(property.features.outdoor, validLocale)}</span>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* ─── DESCRIZIONE + FEATURES ────────────────────────────── */}
      <Section className="bg-stone-50 dark:bg-stone-950">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Descrizione */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
                  {validLocale === 'it' ? 'La casa' : 'About the home'}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mb-6 leading-tight">
                {validLocale === 'it' ? 'Cosa troverai' : 'What you will find'}
              </h2>
              <div className="prose prose-stone dark:prose-invert max-w-none">
                {property.longDescription.map((p, i) => (
                  <p key={i} className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {t(p, validLocale)}
                  </p>
                ))}
              </div>
            </div>

            {/* Specifiche card */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-4">
                  {validLocale === 'it' ? 'In sintesi' : 'At a glance'}
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-stone-500 dark:text-stone-400">{validLocale === 'it' ? 'Ospiti' : 'Guests'}</dt>
                    <dd className="text-stone-900 dark:text-stone-100 font-medium">{validLocale === 'it' ? 'Fino a' : 'Up to'} {property.features.guests}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-stone-500 dark:text-stone-400">{validLocale === 'it' ? 'Camere' : 'Bedrooms'}</dt>
                    <dd className="text-stone-900 dark:text-stone-100 font-medium">{property.features.bedrooms}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-stone-500 dark:text-stone-400">{validLocale === 'it' ? 'Letti' : 'Beds'}</dt>
                    <dd className="text-stone-900 dark:text-stone-100 font-medium text-right">{t(property.features.beds, validLocale)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-stone-500 dark:text-stone-400">{validLocale === 'it' ? 'Bagni' : 'Bathrooms'}</dt>
                    <dd className="text-stone-900 dark:text-stone-100 font-medium">{property.features.bathrooms}</dd>
                  </div>
                  {property.features.sqm && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500 dark:text-stone-400">{validLocale === 'it' ? 'Superficie' : 'Size'}</dt>
                      <dd className="text-stone-900 dark:text-stone-100 font-medium">{property.features.sqm} m²</dd>
                    </div>
                  )}
                  {property.features.outdoor && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-stone-500 dark:text-stone-400">{validLocale === 'it' ? 'Esterno' : 'Outdoor'}</dt>
                      <dd className="text-stone-900 dark:text-stone-100 font-medium">{t(property.features.outdoor, validLocale)}</dd>
                    </div>
                  )}
                </dl>

                <a
                  href={property.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-5 py-3 text-sm font-medium transition-colors"
                >
                  {validLocale === 'it' ? 'Prenota su Airbnb' : 'Book on Airbnb'}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <Link
                  href={`/${validLocale}/#contatti`}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 px-5 py-3 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  {validLocale === 'it' ? 'Scrivici' : 'Contact us'}
                </Link>
              </div>
            </aside>
          </div>

          {/* Amenities */}
          <div className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 mb-6">
              {validLocale === 'it' ? 'Servizi e attrezzature' : 'Amenities'}
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
              {property.amenities.map((a, i) => (
                <li key={i} className="flex items-center gap-2.5 text-stone-700 dark:text-stone-300">
                  <svg className="h-4 w-4 text-amber-700 dark:text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t(a, validLocale)}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ─── GALLERY ─────────────────────────────────────────── */}
      <Section className="bg-stone-100 dark:bg-stone-900">
        <Container>
          <div className="mb-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
                {validLocale === 'it' ? 'Foto' : 'Photos'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
              {validLocale === 'it' ? 'Dentro la casa' : 'Inside the home'}
            </h2>
            <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 tabular-nums">
              {property.gallery.length} {validLocale === 'it' ? 'fotografie' : 'photographs'}
            </p>
          </div>
          <PropertyGallery images={property.gallery} locale={validLocale} />
        </Container>
      </Section>

      {/* ─── QUARTIERE ──────────────────────────────────────── */}
      <Section className="bg-stone-50 dark:bg-stone-950">
        <Container>
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
                  {validLocale === 'it' ? 'La zona' : 'The area'}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mb-6 leading-tight">
                {t(site.neighborhood.title, validLocale)}
              </h2>
              <div className="space-y-4">
                {site.neighborhood.body.map((p, i) => (
                  <p key={i} className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {t(p, validLocale)}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={property.gallery[Math.min(2, property.gallery.length - 1)].src}
                alt={t(property.name, validLocale)}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── RECENSIONI ─────────────────────────────────────── */}
      <Section className="bg-stone-100 dark:bg-stone-900">
        <Container>
          <div className="mb-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
                {validLocale === 'it' ? 'Recensioni' : 'Reviews'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
              {validLocale === 'it' ? 'Dicono di noi' : 'What guests say'}
            </h2>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-stone-600 dark:text-stone-400">
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4 fill-amber-500" viewBox="0 0 20 20">
                  <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9z" />
                </svg>
                <span className="font-medium text-stone-900 dark:text-stone-100 tabular-nums">
                  {property.ratings.overall.toFixed(2).replace('.', ',')}
                </span>
              </span>
              <span>·</span>
              <span>
                {property.ratings.count} {validLocale === 'it' ? 'recensioni' : 'reviews'}
              </span>
              <span>·</span>
              <span>
                {validLocale === 'it' ? 'Top' : 'Top'} {property.ratings.topPercent}% — {validLocale === 'it' ? 'Amato dagli ospiti' : 'Guest Favorite'}
              </span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl">
            {([
              ['cleanliness', validLocale === 'it' ? 'Pulizia' : 'Cleanliness'],
              ['accuracy', validLocale === 'it' ? 'Precisione' : 'Accuracy'],
              ['checkin', 'Check-in'],
              ['communication', validLocale === 'it' ? 'Comunicazione' : 'Communication'],
              ['location', validLocale === 'it' ? 'Posizione' : 'Location'],
              ['value', validLocale === 'it' ? 'Qualità/prezzo' : 'Value'],
            ] as const).map(([key, label]) => (
              <div key={key} className="text-sm">
                <div className="text-stone-500 dark:text-stone-400">{label}</div>
                <div className="font-serif text-2xl text-stone-900 dark:text-stone-100 tabular-nums">
                  {property.ratings.breakdown[key].toFixed(1).replace('.', ',')}
                </div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {property.reviews.slice(0, 6).map((r, i) => (
              <article
                key={i}
                className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-stone-900 dark:text-stone-100">{r.author}</p>
                    {r.location && (
                      <p className="text-xs text-stone-500 dark:text-stone-400">{r.location}</p>
                    )}
                  </div>
                  <span className="flex gap-0.5" aria-label="5 stelle">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} className="h-3.5 w-3.5 fill-amber-500" viewBox="0 0 20 20">
                        <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9z" />
                      </svg>
                    ))}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">{r.date}</p>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={property.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-500 hover:underline"
            >
              {validLocale === 'it'
                ? `Leggi tutte le ${property.ratings.count} recensioni su Airbnb`
                : `Read all ${property.ratings.count} reviews on Airbnb`}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </Container>
      </Section>

      {/* ─── ALTRE CASE ─────────────────────────────────────── */}
      <Section className="bg-stone-50 dark:bg-stone-950">
        <Container>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 mb-8">
            {validLocale === 'it' ? 'Le altre case' : 'Other apartments'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {otherProperties.map((p) => (
              <Link
                key={p.slug}
                href={`/${validLocale}/case/${p.slug}`}
                className="group block bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 dark:bg-stone-700">
                  <Image
                    src={p.cardImage}
                    alt={t(p.name, validLocale)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-1">
                    {p.address}
                  </p>
                  <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                    {t(p.name, validLocale)}
                  </h3>
                  <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
                    {t(p.tagline, validLocale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
