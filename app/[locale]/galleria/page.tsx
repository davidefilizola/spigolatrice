'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Container from '@/core/components/Container'
import Lightbox, { type LightboxImage } from '@/core/components/Lightbox'
import { site } from '@/content/site'
import { t, isValidLocale, type Locale, defaultLocale } from '@/core/lib/i18n'

export default function GalleriaPage() {
  const params = useParams<{ locale: string }>()
  const locale: Locale = isValidLocale(params.locale) ? params.locale : defaultLocale
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Append-all delle immagini delle 3 case, in ordine: Donegani → Grossich → Buschi
  const allImages: LightboxImage[] = useMemo(() => {
    const result: LightboxImage[] = []
    for (const p of site.properties) {
      for (const img of p.gallery) {
        result.push({
          src: img.src,
          alt: `${t(p.name, locale)} — ${img.alt}`,
          width: img.width,
          height: img.height,
          caption: { it: t(p.name, 'it'), en: t(p.name, 'en') },
        })
      }
    }
    return result
  }, [locale])

  // Per ogni casa, indice di partenza nell'array globale (per il lightbox)
  const propertyOffsets = useMemo(() => {
    const offsets: Record<string, number> = {}
    let acc = 0
    for (const p of site.properties) {
      offsets[p.slug] = acc
      acc += p.gallery.length
    }
    return offsets
  }, [])

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28">
      <Container>
        {/* Header */}
        <header className="mb-12 sm:mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
              {locale === 'it' ? 'Galleria' : 'Gallery'}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 leading-[1.05] -tracking-tight">
            {t(site.gallery.title, locale)}
          </h1>
          <p className="mt-5 text-stone-600 dark:text-stone-400 leading-relaxed">
            {t(site.gallery.intro, locale)}
          </p>
          <p className="mt-3 text-sm text-stone-500 dark:text-stone-500 tabular-nums">
            {allImages.length} {locale === 'it' ? 'fotografie · 3 case' : 'photographs · 3 homes'}
          </p>
        </header>

        {/* Sezioni per casa */}
        <div className="space-y-16 sm:space-y-20">
          {site.properties.map((property) => (
            <section key={property.slug}>
              <div className="mb-6 flex items-end justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-1">
                    {property.address}
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
                    {t(property.name, locale)}
                  </h2>
                </div>
                <Link
                  href={`/${locale}/case/${property.slug}`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-500 hover:underline shrink-0"
                >
                  {locale === 'it' ? 'Vai alla casa' : 'See the home'}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div
                className="grid grid-cols-2 gap-2 sm:gap-3 [grid-auto-flow:dense] mx-auto"
                style={{ maxWidth: '60rem' }}
              >
                {property.gallery.map((image, i) => {
                  const cls = {
                    full: 'col-span-2 aspect-[16/9]',
                    half: 'aspect-square',
                    tall: 'row-span-2 aspect-[1/2]',
                  }[image.layout]
                  const globalIndex = propertyOffsets[property.slug] + i
                  return (
                    <button
                      key={image.src}
                      onClick={() => setLightboxIndex(globalIndex)}
                      className={`relative overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800 cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${cls}`}
                      aria-label={`${t(property.name, locale)} — ${image.alt}`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 26vw"
                      />
                      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 sm:hidden">
                <Link
                  href={`/${locale}/case/${property.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-500"
                >
                  {locale === 'it' ? 'Vai alla casa' : 'See the home'}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>
          ))}
        </div>
      </Container>

      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          index={lightboxIndex}
          locale={locale}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
