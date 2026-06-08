import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { site } from '@/content/site'
import { locales, isValidLocale, type Locale } from '@/core/lib/i18n'
import GalleriaContent from './GalleriaContent'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const validLocale = locale as Locale
  const title = validLocale === 'it' ? 'Galleria fotografica' : 'Photo gallery'
  const description = validLocale === 'it'
    ? 'Le foto delle tre case di Spigolatrice di Lambrate a Milano: camere, cucine, dettagli e il quartiere di Lambrate.'
    : 'Photos of the three Spigolatrice di Lambrate homes in Milan: bedrooms, kitchens, details and the Lambrate neighbourhood.'
  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}/${locale}/galleria`,
      languages: {
        it: `${site.url}/it/galleria`,
        en: `${site.url}/en/galleria`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${site.url}/${locale}/galleria`,
      type: 'website',
    },
  }
}

export default async function GalleriaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  return <GalleriaContent locale={locale as Locale} />
}
