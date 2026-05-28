'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Container from '@/core/components/Container'
import Section, { staggerItem } from '@/core/components/Section'
import Lightbox, { type LightboxImage } from '@/core/components/Lightbox'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface NeighborhoodProps {
  locale: Locale
}

/**
 * Sezione home dedicata al quartiere Lambrate.
 * Layout: eyebrow/title/intro a sinistra, feature list e CTA, gallery bento a destra.
 * Mobile: stack verticale.
 */
export default function Neighborhood({ locale }: NeighborhoodProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const n = site.neighborhood
  // Top-5 foto per il bento (le altre 7 sono visibili in /quartiere)
  const preview = n.gallery.slice(0, 5)
  // Per il lightbox usiamo tutte le foto del quartiere
  const allImages: LightboxImage[] = n.gallery.map((g) => ({
    src: g.src,
    alt: g.alt,
    width: g.width,
    height: g.height,
    caption: g.caption,
  }))

  return (
    <Section id="quartiere" className="bg-stone-50 dark:bg-stone-950" stagger>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ─── Sinistra: testo + features + CTA ─── */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
                {t(n.eyebrow, locale)}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight -tracking-tight mb-5">
              {t(n.title, locale)}
            </h2>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-8">
              {t(n.intro, locale)}
            </p>

            <ul className="space-y-4">
              {n.features.map((f, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-2xl shrink-0 leading-none mt-0.5" aria-hidden="true">
                    {f.icon}
                  </span>
                  <div>
                    <p className="font-medium text-stone-900 dark:text-stone-100">
                      {t(f.title, locale)}
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mt-0.5">
                      {t(f.text, locale)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href={`/${locale}/quartiere`}
                className="inline-flex items-center gap-2 rounded-md bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-5 py-3 text-sm font-medium transition-colors"
              >
                {locale === 'it' ? 'Esplora il quartiere' : 'Explore the neighbourhood'}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* ─── Destra: bento gallery 5 foto ─── */}
          <motion.div variants={staggerItem}>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-3 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden">
              {preview.map((image, i) => {
                // Layout bento personalizzato: img 0 grande (col-span-2 row-span-2), poi 4 piccole
                const cls = [
                  'col-span-2 row-span-2',
                  'col-span-1 row-span-1',
                  'col-span-1 row-span-1',
                  'col-span-1 row-span-1',
                  'col-span-2 row-span-1',
                ][i]
                return (
                  <button
                    key={image.src}
                    onClick={() => setLightboxIndex(i)}
                    className={`relative overflow-hidden cursor-zoom-in group bg-stone-200 dark:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${cls}`}
                    aria-label={`Apri ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-stone-500 dark:text-stone-400 text-center">
              {locale === 'it'
                ? `${n.gallery.length} foto del quartiere · clicca per vederle tutte`
                : `${n.gallery.length} neighbourhood photos · tap to see them all`}
            </p>
          </motion.div>
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
    </Section>
  )
}
