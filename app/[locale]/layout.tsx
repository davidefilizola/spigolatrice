import { Geist, Fraunces } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { notFound } from 'next/navigation'
import { locales, isValidLocale, type Locale } from '@/core/lib/i18n'
import { buildMetadata } from '@/core/lib/metadata'
import Header from '@/core/components/Header'
import Footer from '@/core/components/Footer'
import PWARegister from '@/core/components/PWARegister'
import MotionProvider from '@/core/components/MotionProvider'

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  return buildMetadata(locale)
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const validLocale = locale as Locale

  // <html>/<body> stanno qui (non nel root layout) così l'attributo lang
  // riflette il locale corrente (it/en) già lato server — meglio per SEO/a11y.
  return (
    <html
      lang={validLocale}
      className={`${geist.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionProvider>
            <Header locale={validLocale} />
            <main>{children}</main>
            <Footer locale={validLocale} />
            <PWARegister />
          </MotionProvider>
        </ThemeProvider>
        {/* Vercel Analytics: attivo solo in production su Vercel. */}
        <Analytics />
      </body>
    </html>
  )
}
