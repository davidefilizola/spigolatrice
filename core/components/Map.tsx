'use client'

interface MapProps {
  lat: number
  lng: number
  name: string
  address: string
}

/**
 * Mappa Google Maps senza API key:
 * - iframe embed interattivo (zoom, drag) con il marker sull'indirizzo
 * - bottone "Apri in Google Maps" che lancia l'app/sito Google Maps
 */
export default function Map({ lat, lng, name, address }: MapProps) {
  const query = encodeURIComponent(address)
  const embedSrc = `https://www.google.com/maps?q=${query}&z=15&output=embed`
  const openHref = `https://www.google.com/maps/search/?api=1&query=${query}`

  return (
    <div className="relative h-full w-full">
      <iframe
        src={embedSrc}
        title={`${name} — ${address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
      <a
        href={openHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-white/95 dark:bg-stone-900/95 backdrop-blur px-3.5 py-2 text-xs font-medium text-stone-900 dark:text-stone-100 shadow-md hover:shadow-lg transition-shadow"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Apri in Google Maps
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  )
}
