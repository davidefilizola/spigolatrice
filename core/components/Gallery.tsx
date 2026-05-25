'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/core/components/Container'
import Section from '@/core/components/Section'
import Lightbox from '@/core/components/Lightbox'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface GalleryProps {
  locale: Locale
}

/**
 * Anteprima galleria in homepage:
 * - 5 foto in layout bento (1 grande + 4 piccole)
 * - bottone "Vedi tutta la galleria" → /galleria
 */
export default function Gallery({ locale }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const previewImages = site.gallery.images.slice(0, 5)

  return (
    <Section id="galleria" className="bg-stone-100 dark:bg-stone-900">
      <Container>
        <div className="mb-12 text-center max-w-xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100">
            {t(site.gallery.title, locale)}
          </h2>
          {site.gallery.intro && (
            <p className="mt-3 text-stone-600 dark:text-stone-400">
              {t(site.gallery.intro, locale)}
            </p>
          )}
        </div>

        {/*
          Bento layout
          Mobile: 1 grande in cima (foto 0), 2×2 sotto (foto 1-4)
          Desktop: 1 grande a sinistra (2 col × 2 rows), 4 piccole a destra
        */}
        <div className="grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 gap-3 sm:gap-4 sm:aspect-[2/1]">
          {previewImages.map((image, i) => {
            // foto 0: grande (col-span-2 row-span-1 mobile, sm: col-span-2 row-span-2)
            const isFeatured = i === 0
            const className = isFeatured
              ? 'col-span-2 sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto'
              : 'aspect-square sm:aspect-auto'
            return (
              <button
                key={image.src}
                className={`relative overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800 cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${className}`}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Apri ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={
                    isFeatured
                      ? '(max-width: 640px) 100vw, 50vw'
                      : '(max-width: 640px) 50vw, 25vw'
                  }
                />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            )
          })}
        </div>

        {/* Bottone "Vedi tutta la galleria" */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/galleria`}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
          >
            <span>{t(site.gallery.viewAll, locale)}</span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-500 dark:text-stone-400">
              {site.gallery.images.length} {locale === 'it' ? 'foto' : 'photos'}
            </span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
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
    </Section>
  )
}
