'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { t, type Locale } from '@/core/lib/i18n'
import { useModalA11y } from '@/core/lib/useModalA11y'

export interface LightboxImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: { it: string; en: string }
}

interface LightboxProps {
  images: LightboxImage[]
  /** Indice della foto da cui aprire. Da qui in poi l'indice è gestito internamente. */
  initialIndex: number
  locale: Locale
  onClose: () => void
}

/**
 * Lightbox riusabile per scorrere le foto a schermo intero.
 * - Mobile: swipe orizzontale fluido (track nativo scroll-snap, indice locale).
 * - Desktop: una foto alla volta con frecce + tastiera (←/→/Esc).
 * Best practice modal incluse: focus trap, blocco scroll del body, ripristino del
 * focus alla chiusura, e tasto "indietro" del browser/telefono che chiude l'overlay.
 */
export default function Lightbox({
  images,
  initialIndex,
  locale,
  onClose,
}: LightboxProps) {
  const [active, setActive] = useState(initialIndex)
  const trackRef = useRef<HTMLDivElement>(null)
  // Comportamenti standard del modal (scroll lock, focus trap, focus restore,
  // Esc e tasto "indietro" del telefono per chiudere) — vedi useModalA11y.
  const dialogRef = useModalA11y<HTMLDivElement>(true, onClose, { backButton: true })

  const total = images.length
  const labels =
    locale === 'it'
      ? { close: 'Chiudi', prev: 'Precedente', next: 'Successiva', dialog: 'Galleria immagini' }
      : { close: 'Close', prev: 'Previous', next: 'Next', dialog: 'Image gallery' }

  // Chiusura: passa dal tasto "indietro" così consumiamo lo stato di history
  // aggiunto dall'hook all'apertura.
  const requestClose = () => window.history.back()

  // Navigazione da tastiera (desktop): frecce ← / → (Esc è gestito dall'hook)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % total)
      else if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + total) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  // Posiziona il track mobile: apertura + cambi da frecce/tastiera. Niente loop:
  // dopo lo scroll l'indice derivato coincide con `active`.
  useEffect(() => {
    const el = trackRef.current
    if (!el || el.clientWidth === 0) return
    const derived = Math.round(el.scrollLeft / el.clientWidth)
    if (derived !== active) el.scrollTo({ left: active * el.clientWidth })
  }, [active])

  // Aggiorna l'indice durante lo swipe (mobile) — solo stato locale → fluido
  const onTrackScroll = () => {
    const el = trackRef.current
    if (!el || el.clientWidth === 0) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== active) setActive(i)
  }

  // Precarica le immagini adiacenti per evitare flash durante lo swipe
  useEffect(() => {
    const preload = (i: number) => {
      const img = new window.Image()
      img.src = images[(i + total) % total].src
    }
    preload(active + 1)
    preload(active - 1)
  }, [active, images, total])

  const current = images[active]
  if (!current) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={requestClose}
    >
      {/* Top bar — contatore + chiudi */}
      <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 text-white/80">
        <span className="text-sm tabular-nums">
          <span className="font-serif italic text-base">{String(active + 1).padStart(2, '0')}</span>
          <span className="mx-1.5 opacity-50">/</span>
          <span className="opacity-70">{String(total).padStart(2, '0')}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            requestClose()
          }}
          className="flex h-11 w-11 items-center justify-center -mr-2 hover:text-white"
          aria-label={labels.close}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* MOBILE — track con swipe fluido (scroll-snap nativo, indice locale) */}
      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        onClick={(e) => e.stopPropagation()}
        className="sm:hidden flex-1 flex overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img) => (
          <div key={img.src} className="relative shrink-0 w-full h-full snap-center">
            <Image src={img.src} alt={img.alt} fill className="object-contain" sizes="100vw" />
          </div>
        ))}
      </div>

      {/* DESKTOP — una foto alla volta con frecce */}
      <div className="hidden sm:flex relative flex-1 items-center justify-center px-12">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setActive((a) => (a - 1 + total) % total)
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label={labels.prev}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          key={current.src}
          className="relative max-h-full max-w-full animate-[fade-in_0.25s_ease-out] motion-reduce:animate-none"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="max-h-[80vh] w-auto h-auto object-contain rounded-lg"
            priority
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            setActive((a) => (a + 1) % total)
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label={labels.next}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom bar — didascalia (se presente) */}
      <div className="relative z-10 px-4 sm:px-6 pb-5 pt-2 text-center text-white/80 min-h-[3rem]">
        {current.caption && (
          <p className="font-serif italic text-base sm:text-lg">{t(current.caption, locale)}</p>
        )}
      </div>
    </div>
  )
}
