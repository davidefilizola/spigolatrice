import { locales, isValidLocale, type Locale } from '@/core/lib/i18n'
import { buildMetadata } from '@/core/lib/metadata'
import { notFound } from 'next/navigation'
import Header from '@/core/components/Header'
import Footer from '@/core/components/Footer'

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

  return (
    <>
      <Header locale={validLocale} />
      <main>{children}</main>
      <Footer locale={validLocale} />
    </>
  )
}
