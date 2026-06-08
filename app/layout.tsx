import type { Metadata, Viewport } from 'next'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  // PWA: iOS-specific
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: 'default',
  },
  // NB: niente `icons` qui — Next.js rileva automaticamente
  // app/icon.png e app/apple-icon.png via file convention, e
  // dichiarare manualmente `icons.apple` sovrascriveva l'auto-detection
  // facendo sparire il favicon dalla tab.
}

export const viewport: Viewport = {
  // Colore della barra di sistema (mobile browser + PWA installata)
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcf8f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0b08' },
  ],
}

// Root layout "passthrough": <html>/<body>, font e provider sono nel layout
// [locale], così <html lang> riflette il locale (it/en) lato server. Con il
// middleware ogni richiesta senza locale viene rediretta a /{locale}, quindi
// anche i 404 passano dal layout [locale] e hanno il loro <html>.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
