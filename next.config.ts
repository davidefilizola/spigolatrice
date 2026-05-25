import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Permette ai placeholder SVG di funzionare con next/image.
    // Rimuovi quando sostituisci con immagini reali (jpg/webp/png).
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
