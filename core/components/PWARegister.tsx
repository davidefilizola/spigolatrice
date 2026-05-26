'use client'
import { useEffect } from 'react'

/**
 * Registra il service worker per rendere il sito installabile come PWA.
 * Va incluso una sola volta nel root layout.
 *
 * In dev (npm run dev) la registrazione viene saltata per evitare cache stale.
 * In produzione (npm run build && npm start) il SW viene installato.
 */
export default function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return

    const onLoad = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch((err) => console.warn('SW registration failed', err))
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return null
}
