import type { Metadata, Viewport } from 'next'
import { Geist, Fraunces } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import PWARegister from '@/core/components/PWARegister'
import MotionProvider from '@/core/components/MotionProvider'
import { site } from '@/content/site'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${geist.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionProvider>
            {children}
            <PWARegister />
          </MotionProvider>
        </ThemeProvider>
        {/* Vercel Analytics: attivo solo in production su Vercel.
            In locale è no-op. Niente cookie banner richiesto (GDPR-safe). */}
        <Analytics />
      </body>
    </html>
  )
}
