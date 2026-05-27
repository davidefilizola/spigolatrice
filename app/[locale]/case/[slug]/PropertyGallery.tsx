'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/core/components/Lightbox'
import { type Locale } from '@/core/lib/i18n'
import type { Property } from '@/content/site'

interface Props {
  images: Property['gallery']
  locale: Locale
}

/**
 * Gallery dedicata della singola casa.
 * - Mobile: griglia 2 colonne
 * - Desktop: stessa griglia masonry stile Airbnb (full/half/tall)
 * Lightbox condiviso al click.
 */
export default function PropertyGallery({ images, locale }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // I tipi del lightbox sono mutabili, mentre site.ts esporta tipi readonly.
  // Faccio uno spread per ottenere un array mutabile compatibile.
  const mutable = images.map((i) => ({
    src: i.src,
    alt: i.alt,
    width: i.width,
    height: i.height,
    caption: i.caption,
  }))

  return (
    <>
      <div
        className="grid grid-cols-2 gap-2 sm:gap-3 [grid-auto-flow:dense] mx-auto"
        style={{ maxWidth: '60rem' }}
      >
        {images.map((image, i) => {
          const cls = {
            full: 'col-span-2 aspect-[16/9]',
            half: 'aspect-square',
            tall: 'row-span-2 aspect-[1/2]',
          }[image.layout]
          return (
            <button
              key={image.src}
              onClick={() => setLightboxIndex(i)}
              className={`relative overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800 cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${cls}`}
              aria-label={`Apri ${image.alt}`}
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

      {lightboxIndex !== null && (
        <Lightbox
          images={mutable}
          index={lightboxIndex}
          locale={locale}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
