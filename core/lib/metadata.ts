import type { Metadata } from 'next'
import { site } from '@/content/site'
import { t, type Locale } from './i18n'

const ogLocale: Record<Locale, string> = {
  it: 'it_IT',
  en: 'en_US',
}

const baseDescriptionByLocale: Record<Locale, string> = {
  it: 'Tre appartamenti in affitto breve a Milano, nel quartiere universitario di Lambrate. 4,9★ su Airbnb, a 2 minuti dalla metro M2. Accettiamo anche Bitcoin.',
  en: 'Three short-stay apartments in Milan, in the Lambrate university district. 4.9★ on Airbnb, 2 minutes from the M2 metro. We also accept Bitcoin.',
}

// Keywords aggregate: brand + locali + zona + nicchia "cripto"
const allKeywords: Record<Locale, string[]> = {
  it: [
    // brand (priorità massima)
    'spigolatrice di lambrate',
    'spigolatricedilambrate',
    'pamela pinna affitti milano',
    // affitti brevi generici
    'affitti brevi milano',
    'appartamenti milano lambrate',
    'casa vacanze milano lambrate',
    'b&b milano lambrate',
    'milano quartiere universitario',
    'appartamento milano breve termine',
    // location specifiche
    'piazza donegani milano',
    'via grossich milano',
    'via averardo buschi milano',
    'lambrate stazione',
    'politecnico milano alloggio',
    'università statale alloggio',
    // nicchia cripto
    'affitto milano bitcoin',
    'affitto milano cripto',
    'affitto italia cripto',
    'affitto bitcoin italia',
    'airbnb bitcoin milano',
    'pagamento criptovalute affitto',
  ],
  en: [
    // brand
    'spigolatrice di lambrate',
    'spigolatricedilambrate',
    // generic short stay
    'milan short term rental',
    'milan apartments lambrate',
    'milan student district apartment',
    'milan vacation rental lambrate',
    'milan bed and breakfast',
    // specific
    'lambrate apartments milan',
    'politecnico milan accommodation',
    'piazza leonardo da vinci stay',
    // crypto niche
    'rent milan crypto',
    'rent milan bitcoin',
    'rent italy crypto',
    'rent italy bitcoin',
    'milan airbnb bitcoin',
    'cryptocurrency rental milan',
    'crypto payment vacation rental',
  ],
}

/**
 * Metadata base per il layout per-locale.
 * Le singole pagine sovrascrivono title/description via generateMetadata.
 */
export function buildMetadata(locale: Locale): Metadata {
  const description = baseDescriptionByLocale[locale]
  // Titolo "nudo" per il tag <title> (il template del layout aggiunge "| brand"
  // una sola volta, niente brand doppio) e titolo "completo" col brand per i
  // social (OpenGraph/Twitter), dove og:site_name da solo non basta.
  const titleBare = locale === 'it'
    ? 'Affitti brevi a Milano · Lambrate'
    : 'Short-stay rentals in Milan · Lambrate'
  const titleFull = `${site.name} — ${titleBare}`

  return {
    metadataBase: new URL(site.url),
    title: { default: titleBare, template: `%s | ${site.name}` },
    description,
    keywords: allKeywords[locale],
    applicationName: site.name,
    authors: [{ name: 'Pamela Pinna' }],
    creator: 'Pamela Pinna',
    publisher: 'Spigolatrice di Lambrate',
    formatDetection: { telephone: true, address: true, email: true },
    openGraph: {
      title: titleFull,
      description,
      url: `${site.url}/${locale}`,
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: Object.values(ogLocale).filter((l) => l !== ogLocale[locale]),
      type: 'website',
      images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleFull,
      description,
      images: [site.seo.ogImage],
    },
    alternates: {
      canonical: `${site.url}/${locale}`,
      languages: {
        it: `${site.url}/it`,
        en: `${site.url}/en`,
        'x-default': `${site.url}/it`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Google Search Console: appena l'utente registra il sito su Search Console
    // riceve un codice di verifica. Mettilo in .env.local come GOOGLE_SITE_VERIFICATION
    // e Next lo inserirà automaticamente come <meta name="google-site-verification">.
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}
