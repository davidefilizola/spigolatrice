import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Necessario per accedere al dev server da dispositivi della stessa LAN (es. telefono).
  // Aggiungere qui l'IP del Mac quando si vuole testare su mobile. Solo per `next dev`.
  allowedDevOrigins: ['192.168.1.172'],
  images: {
    // Permette ai placeholder SVG di funzionare con next/image.
    // Rimuovi quando sostituisci con immagini reali (jpg/webp/png).
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
