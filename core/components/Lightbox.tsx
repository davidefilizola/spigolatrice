'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { t, type Locale } from '@/core/lib/i18n'

export interface LightboxImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: { it: string; en: string }
}

interface LightboxProps {
  images: LightboxImage[]
  index: number
  locale: Locale
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export default function Lightbox({
  images,
  index,
  locale,
  onClose,
  onNavigate,
}: LightboxProps) {
  const current = images[index]
  const touchStartX = useRef<number | null>(null)
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)

  const next = () => {
    setDirection('next')
    onNavigate((index + 1) % images.length)
  }
  const prev = () => {
    setDirection('prev')
    onNavigate((index - 1 + images.length) % images.length)
  }

  // Keyboard nav + ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // Preload immagini adiacenti per evitare flash
  useEffect(() => {
    const nextImg = new window.Image()
    nextImg.src = images[(index + 1) % images.length].src
    const prevImg = new window.Image()
    prevImg.src = images[(index - 1 + images.length) % images.length].src
  }, [index, images])

  // Swipe touch
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? prev() : next()
    }
    touchStartX.current = null
  }

  if (!current) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 sm:p-6 text-white/80">
        <span className="text-sm tabular-nums">
          <span className="font-serif italic text-base">{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-1.5 opacity-50">/</span>
          <span className="opacity-70">{String(images.length).padStart(2, '0')}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="p-2 -mr-2 hover:text-white"
          aria-label="Chiudi"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div className="relative flex-1 flex items-center justify-center px-4 pb-4 sm:px-12">
        {/* Prev arrow (desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            prev()
          }}
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Precedente"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Image */}
        <div
          key={current.src}
          className={`relative max-h-full max-w-full ${
            direction === 'next' ? 'animate-[fade-in_0.25s_ease-out]' : ''
          } ${direction === 'prev' ? 'animate-[fade-in_0.25s_ease-out]' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="max-h-[75vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-lg"
            priority
          />
        </div>

        {/* Next arrow (desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            next()
          }}
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Successiva"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom bar — caption + mobile arrows */}
      <div className="p-4 sm:p-6 text-center text-white/80">
        {current.caption && (
          <p className="font-serif italic text-base sm:text-lg mb-3">
            {t(current.caption, locale)}
          </p>
        )}
        {/* Mobile-only arrows */}
        <div className="flex sm:hidden justify-center gap-4 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white"
            aria-label="Precedente"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white"
            aria-label="Successiva"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
