import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Container from '@/core/components/Container'
import FAQ from '@/core/components/FAQ'
import { site } from '@/content/site'
import { locales, isValidLocale, t, type Locale } from '@/core/lib/i18n'

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
  const title = `${t(site.faq.title, validLocale)} · ${site.name}`
  return {
    title,
    description: validLocale === 'it'
      ? 'Tutte le risposte alle domande più frequenti su Spigolatrice di Lambrate.'
      : 'All the answers to the most common questions about Spigolatrice di Lambrate.',
    alternates: {
      canonical: `${site.url}/${locale}/faq`,
      languages: {
        it: `${site.url}/it/faq`,
        en: `${site.url}/en/faq`,
      },
    },
  }
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const validLocale = locale as Locale

  return (
    <div className="pt-28 sm:pt-32">
      <Container>
        <header className="max-w-2xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
              FAQ
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 leading-[1.05] -tracking-tight">
            {t(site.faq.title, validLocale)}
          </h1>
          <p className="mt-5 text-stone-600 dark:text-stone-400 leading-relaxed">
            {validLocale === 'it'
              ? 'Tutto quello che ti serve sapere prima di prenotare una delle nostre case. Per altro, scrivici via WhatsApp o email — rispondiamo entro poche ore.'
              : 'Everything you need to know before booking one of our homes. For anything else, write to us via WhatsApp or email — we reply within a few hours.'}
          </p>
        </header>
      </Container>
      <FAQ locale={validLocale} />
    </div>
  )
}
