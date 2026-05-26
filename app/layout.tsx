import type { Metadata, Viewport } from 'next'
import { Geist, Fraunces } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import PWARegister from '@/core/components/PWARegister'
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
  // PWA: collega apple touch icon
  icons: {
    apple: '/icons/apple-touch-icon.png',
  },
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
          {children}
          <PWARegister />
        </ThemeProvider>
      </body>
    </html>
  )
}
