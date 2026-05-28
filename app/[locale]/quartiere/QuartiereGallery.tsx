'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox, { type LightboxImage } from '@/core/components/Lightbox'
import { site } from '@/content/site'
import { type Locale } from '@/core/lib/i18n'

interface Props {
  locale: Locale
}

/**
 * Gallery completa quartiere (12 foto) con masonry 2-col + lightbox.
 * Layout half/full/tall come la /galleria principale.
 */
export default function QuartiereGallery({ locale }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = site.neighborhood.gallery
  const lightboxImages: LightboxImage[] = images.map((g) => ({
    src: g.src,
    alt: g.alt,
    width: g.width,
    height: g.height,
    caption: g.caption,
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
          images={lightboxImages}
          index={lightboxIndex}
          locale={locale}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
