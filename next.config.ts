import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Necessario per accedere al dev server da dispositivi della stessa LAN (es. telefono).
  // Aggiungere qui l'IP del Mac quando si vuole testare su mobile. Solo per `next dev`.
  allowedDevOrigins: ['192.168.1.172'],
  images: {
    // picsum.photos: placeholder fotografici realistici per lo sviluppo.
    // Rimuovi quando sostituisci con immagini reali nel proprio dominio.
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
    // Formati moderni in ordine di preferenza: AVIF è ~50% più piccolo di JPEG,
    // WebP ~30%. Vercel li serve automaticamente in base al supporto browser.
    formats: ['image/avif', 'image/webp'],
    // Default qualities: usate quando non si passa `quality` esplicito a <Image />.
    qualities: [70, 75, 85],
    // Cache delle immagini ottimizzate per 1 anno (immutable).
    minimumCacheTTL: 31536000,
    // Permette ancora gli SVG locali (es. og-image, icone).
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
