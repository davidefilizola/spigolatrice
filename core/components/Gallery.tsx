'use client'
import { useState, useRef, useEffect } from 'react'
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
 * Home gallery in stile Airbnb:
 * - Mobile: swipe carousel orizzontale con scroll-snap + dots + contatore
 * - Desktop: 5 foto bento (1 grande + 4 piccole) con overlay "Mostra tutte" sulla 5ª
 */
export default function Gallery({ locale }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const previewImages = site.gallery.images.slice(0, 5)

  return (
    <Section id="galleria" className="bg-stone-100 dark:bg-stone-900">
      <Container>
        <div className="mb-10 sm:mb-12 text-center max-w-xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100">
            {t(site.gallery.title, locale)}
          </h2>
          {site.gallery.intro && (
            <p className="mt-3 text-stone-600 dark:text-stone-400">
              {t(site.gallery.intro, locale)}
            </p>
          )}
        </div>

        {/* MOBILE: swipe carousel */}
        <MobileCarousel
          images={previewImages}
          totalCount={site.gallery.images.length}
          locale={locale}
          onOpen={setLightboxIndex}
        />

        {/* DESKTOP: 5-photo bento with "Show all" overlay */}
        <DesktopBento
          images={previewImages}
          totalCount={site.gallery.images.length}
          locale={locale}
          onOpen={setLightboxIndex}
        />
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

// ─── Mobile: carousel orizzontale swipe ────────────────────────────────
function MobileCarousel({
  images,
  totalCount,
  locale,
  onOpen,
}: {
  images: ReadonlyArray<(typeof site.gallery.images)[number]>
  totalCount: number
  locale: Locale
  onOpen: (i: number) => void
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const itemWidth = el.scrollWidth / images.length
      const i = Math.round(el.scrollLeft / itemWidth)
      setActiveIndex(Math.min(i, images.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [images.length])

  return (
    <div className="sm:hidden">
      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <button
            key={image.src}
            onClick={() => onOpen(i)}
            className="relative shrink-0 w-[92%] aspect-[4/3] rounded-xl overflow-hidden snap-center bg-stone-200 dark:bg-stone-800"
            aria-label={`Apri ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="92vw"
            />
          </button>
        ))}
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-stone-900 dark:bg-stone-100'
                  : 'w-1.5 bg-stone-400 dark:bg-stone-600'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400 tabular-nums">
          {activeIndex + 1} / {totalCount}
        </span>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/${locale}/galleria`}
          className="inline-flex items-center justify-center gap-2 w-full rounded-md border border-stone-800 dark:border-stone-200 text-stone-900 dark:text-stone-100 px-6 py-3 text-sm font-medium hover:bg-stone-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-stone-900 transition-colors"
        >
          {t(site.gallery.viewAll, locale)} · {totalCount}
        </Link>
      </div>
    </div>
  )
}

// ─── Desktop: bento 1+2×2 con overlay "Mostra tutte" ───────────────────
function DesktopBento({
  images,
  totalCount,
  locale,
  onOpen,
}: {
  images: ReadonlyArray<(typeof site.gallery.images)[number]>
  totalCount: number
  locale: Locale
  onOpen: (i: number) => void
}) {
  return (
    <div className="hidden sm:block">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 aspect-[2/1] rounded-2xl overflow-hidden">
        {images.map((image, i) => {
          const isFeatured = i === 0
          const isLast = i === images.length - 1
          const className = isFeatured
            ? 'col-span-2 row-span-2'
            : 'col-span-1 row-span-1'

          // 5ª foto (ultima) → naviga alla pagina /galleria
          // Foto 1-4 → apre lightbox
          if (isLast) {
            return (
              <Link
                key={image.src}
                href={`/${locale}/galleria`}
                className={`relative overflow-hidden group bg-stone-200 dark:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${className}`}
                aria-label={t(site.gallery.viewAll, locale)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="25vw"
                />
                <span className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md bg-white/95 dark:bg-stone-900/95 backdrop-blur px-4 py-2.5 text-sm font-medium text-stone-900 dark:text-stone-100 shadow-md group-hover:shadow-lg transition-shadow">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h6v6H4zM14 6h6v6h-6zM4 16h6v4H4zM14 16h6v4h-6z" />
                  </svg>
                  {locale === 'it' ? 'Mostra tutte' : 'Show all'}
                </span>
              </Link>
            )
          }

          return (
            <button
              key={image.src}
              onClick={() => onOpen(i)}
              className={`relative overflow-hidden cursor-zoom-in group bg-stone-200 dark:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${className}`}
              aria-label={`Apri ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={isFeatured ? '50vw' : '25vw'}
              />
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
