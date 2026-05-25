'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Container from '@/core/components/Container'
import Section from '@/core/components/Section'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface GalleryProps {
  locale: Locale
}

export default function Gallery({ locale }: GalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  // Chiudi lightbox con tasto ESC
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <Section id="galleria" className="bg-stone-100 dark:bg-stone-900">
      <Container>
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-stone-900 dark:text-stone-100 mb-14">
          {t(site.gallery.title, locale)}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {site.gallery.images.map((image, i) => (
            <button
              key={image.src}
              className="relative aspect-square overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-800 cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              onClick={() => setLightbox(image.src)}
              aria-label={`Apri immagine ${i + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>
      </Container>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-xl leading-none p-2"
            onClick={() => setLightbox(null)}
            aria-label="Chiudi"
          >
            ✕
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={lightbox}
              alt=""
              width={1600}
              height={1066}
              className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </Section>
  )
}
