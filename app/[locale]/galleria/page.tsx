'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Container from '@/core/components/Container'
import Lightbox from '@/core/components/Lightbox'
import { site } from '@/content/site'
import { t, isValidLocale, type Locale, defaultLocale } from '@/core/lib/i18n'

export default function GalleriaPage() {
  const params = useParams<{ locale: string }>()
  const locale: Locale = isValidLocale(params.locale) ? params.locale : defaultLocale
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28">
      <Container>
        {/* Header pagina */}
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
            {site.gallery.images.length} {locale === 'it' ? 'fotografie' : 'photographs'}
          </p>
        </header>

        {/*
          Masonry via CSS columns
          Mobile: 2 colonne
          Tablet: 3 colonne
          Desktop: 4 colonne
          break-inside-avoid impedisce che una foto venga "spezzata" tra colonne
        */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 [column-fill:_balance]">
          {site.gallery.images.map((image, i) => (
            <button
              key={image.src}
              onClick={() => setLightboxIndex(i)}
              className="block w-full mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800 cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              aria-label={`Apri ${image.alt}`}
            >
              <div className="relative" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </Container>

      {lightboxIndex !== null && (
        <Lightbox
          images={[...site.gallery.images]}
          index={lightboxIndex}
          locale={locale}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
