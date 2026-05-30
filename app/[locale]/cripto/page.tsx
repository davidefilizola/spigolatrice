import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Container from '@/core/components/Container'
import Section from '@/core/components/Section'
import WhatsAppButton from '@/core/components/WhatsAppButton'
import { site } from '@/content/site'
import { locales, isValidLocale, t, type Locale } from '@/core/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// ── Copy bilingue centralizzato ──────────────────────────────────────────
const COPY = {
  it: {
    eyebrow: 'Bitcoin · Ethereum · Stablecoin',
    title: 'Affitti brevi a Milano pagabili in Bitcoin e criptovalute',
    intro: 'Spigolatrice di Lambrate è una delle poche realtà di affitti brevi a Milano che accetta pagamenti diretti in criptovaluta. Tre appartamenti nel quartiere universitario di Lambrate, a due passi dalla metro M2, prenotabili in BTC, ETH, USDC, USDT e altre coin su accordo diretto.',
    metaTitle: 'Affitto Milano Bitcoin · pagamento in cripto · Spigolatrice di Lambrate',
    metaDescription: 'Affitti brevi a Milano pagabili in Bitcoin, Ethereum e stablecoin (USDC, USDT). Tre appartamenti nel quartiere di Lambrate. Crypto-friendly host: prenota in cripto, senza chargeback, con conferma rapida.',
    acceptedTitle: 'Cosa accettiamo',
    accepted: [
      { name: 'Bitcoin (BTC)', desc: 'On-chain o Lightning per importi piccoli.' },
      { name: 'Ethereum (ETH)', desc: 'Rete principale o Layer 2 (Arbitrum, Base).' },
      { name: 'USDC, USDT', desc: 'Stablecoin per evitare la volatilità.' },
      { name: 'Altre coin', desc: 'Su richiesta. Scrivici per concordare.' },
    ],
    howTitle: 'Come funziona',
    how: [
      { n: '1', title: 'Scrivici', text: 'Contattaci via WhatsApp o email indicando date, numero ospiti e casa preferita.' },
      { n: '2', title: 'Confermiamo disponibilità e tariffa', text: 'Ti diamo il prezzo in EUR e la cifra equivalente in BTC/ETH/USDC al momento.' },
      { n: '3', title: 'Invio cripto', text: 'Ti mandiamo un wallet address dedicato. Dopo la conferma on-chain, la prenotazione è bloccata.' },
      { n: '4', title: 'Check-in flessibile', text: 'Self check-in con istruzioni inviate per tempo, anche di notte o nel weekend.' },
    ],
    whyTitle: 'Perché pagare in cripto',
    why: [
      { icon: '⚡', title: 'Conferma in minuti', text: 'On-chain o Lightning: la prenotazione è confermata appena la transazione è validata.' },
      { icon: '🔒', title: 'Niente chargeback', text: 'Pagamento finale, niente sorprese. Più trasparenza per te e per noi.' },
      { icon: '🌍', title: 'Senza confini', text: 'Niente conversioni valuta, niente commissioni internazionali della tua banca.' },
      { icon: '🤝', title: 'Host crypto-friendly', text: 'Conosciamo come funzionano i wallet — non sei il primo ospite a pagarci in BTC.' },
    ],
    faqTitle: 'Domande frequenti sul pagamento in cripto',
    faqs: [
      {
        q: 'Quali criptovalute accettate esattamente?',
        a: 'Bitcoin (BTC, anche Lightning), Ethereum (ETH, anche Arbitrum/Base), stablecoin USDC e USDT. Altre coin su richiesta — scrivici prima di prenotare.',
      },
      {
        q: 'A che cambio convertite l\'importo in EUR in cripto?',
        a: 'Usiamo il prezzo di mercato medio al momento della conferma (CoinGecko / Kraken). Una volta concordato, blocchiamo l\'importo: non paghi differenze se il prezzo si muove durante l\'invio.',
      },
      {
        q: 'Posso pagare il deposito cauzionale in cripto?',
        a: 'Sì. Lo gestiamo come escrow: ti restituiamo l\'importo in stablecoin dopo il check-out, o lo convertiamo in EUR se preferisci.',
      },
      {
        q: 'È legale pagare un affitto in Bitcoin in Italia?',
        a: 'Sì. In Italia le criptovalute sono legali come mezzo di pagamento concordato fra le parti. Emettiamo regolare ricevuta in EUR equivalente, valida ai fini fiscali sia per noi che per te.',
      },
      {
        q: 'E se preferisco pagare in EUR via Airbnb?',
        a: 'Nessun problema. Le case sono prenotabili anche via Airbnb come qualsiasi altro ospite. La cripto è un\'opzione aggiuntiva, non obbligatoria.',
      },
    ],
    cta: {
      title: 'Pronto a prenotare in cripto?',
      desc: 'Mandaci un messaggio WhatsApp o una email indicando date, numero ospiti e casa preferita. Rispondiamo entro poche ore.',
    },
    appsTitle: 'Le tre case',
    backToHome: '← Home',
  },
  en: {
    eyebrow: 'Bitcoin · Ethereum · Stablecoins',
    title: 'Short-stay rentals in Milan paid in Bitcoin & cryptocurrency',
    intro: 'Spigolatrice di Lambrate is one of the few short-stay rentals in Milan that accepts direct cryptocurrency payments. Three apartments in the Lambrate university district, steps from the M2 metro, bookable in BTC, ETH, USDC, USDT and other coins by direct arrangement.',
    metaTitle: 'Rent Milan with Bitcoin · crypto payment · Spigolatrice di Lambrate',
    metaDescription: 'Short-stay rentals in Milan payable in Bitcoin, Ethereum and stablecoins (USDC, USDT). Three apartments in Lambrate. Crypto-friendly host: book with crypto, no chargebacks, fast confirmation.',
    acceptedTitle: 'What we accept',
    accepted: [
      { name: 'Bitcoin (BTC)', desc: 'On-chain or Lightning for smaller amounts.' },
      { name: 'Ethereum (ETH)', desc: 'Mainnet or Layer 2 (Arbitrum, Base).' },
      { name: 'USDC, USDT', desc: 'Stablecoins to avoid volatility.' },
      { name: 'Other coins', desc: 'On request. Get in touch to discuss.' },
    ],
    howTitle: 'How it works',
    how: [
      { n: '1', title: 'Write to us', text: 'Contact us via WhatsApp or email with dates, guest count and preferred apartment.' },
      { n: '2', title: 'Confirm availability & rate', text: 'We give you the price in EUR and the current equivalent in BTC / ETH / USDC.' },
      { n: '3', title: 'Send crypto', text: 'We share a dedicated wallet address. Once the transaction confirms on-chain, your booking is locked.' },
      { n: '4', title: 'Flexible check-in', text: 'Self check-in with instructions sent ahead, anytime — late night, weekends, holidays.' },
    ],
    whyTitle: 'Why pay in crypto',
    why: [
      { icon: '⚡', title: 'Confirmed in minutes', text: 'On-chain or Lightning: booking confirmed as soon as the transaction is validated.' },
      { icon: '🔒', title: 'No chargebacks', text: 'Final payment, no surprises. More transparency for both sides.' },
      { icon: '🌍', title: 'Borderless', text: 'No currency conversion, no international bank fees on your side.' },
      { icon: '🤝', title: 'Crypto-friendly host', text: 'We know how wallets work — you\'re not the first guest to pay us in BTC.' },
    ],
    faqTitle: 'Crypto-payment FAQ',
    faqs: [
      {
        q: 'Which cryptocurrencies do you accept exactly?',
        a: 'Bitcoin (BTC, including Lightning), Ethereum (ETH, including Arbitrum/Base), USDC and USDT stablecoins. Other coins on request — write to us before booking.',
      },
      {
        q: 'What exchange rate do you use for the EUR-to-crypto conversion?',
        a: 'We use the mid-market price at the moment of confirmation (CoinGecko / Kraken). Once agreed we lock the amount: you don\'t pay extra if the price moves while you\'re sending.',
      },
      {
        q: 'Can I pay the security deposit in crypto?',
        a: 'Yes. We handle it as escrow: we refund the amount in stablecoin after check-out, or convert it to EUR if you prefer.',
      },
      {
        q: 'Is it legal to pay rent in Bitcoin in Italy?',
        a: 'Yes. In Italy cryptocurrencies are legal as a means of payment agreed between the parties. We issue a regular EUR-equivalent receipt, fully valid for tax purposes.',
      },
      {
        q: 'What if I prefer paying in EUR via Airbnb?',
        a: 'No problem. The homes are bookable on Airbnb like any other listing. Crypto is an additional option, never mandatory.',
      },
    ],
    cta: {
      title: 'Ready to book with crypto?',
      desc: 'Send us a WhatsApp message or email with dates, guest count and preferred apartment. We reply within a few hours.',
    },
    appsTitle: 'The three homes',
    backToHome: '← Home',
  },
} as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const validLocale = locale as Locale
  const c = COPY[validLocale]
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: validLocale === 'it'
      ? [
          'affitto milano bitcoin', 'affitto milano cripto', 'affitto italia cripto',
          'affitto bitcoin italia', 'pagamento criptovalute affitto', 'airbnb bitcoin milano',
          'casa vacanze bitcoin milano', 'spigolatrice di lambrate cripto',
        ]
      : [
          'rent milan crypto', 'rent milan bitcoin', 'rent italy crypto', 'rent italy bitcoin',
          'milan airbnb bitcoin', 'cryptocurrency rental milan', 'crypto payment vacation rental',
          'bitcoin vacation rental italy', 'spigolatrice di lambrate crypto',
        ],
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `${site.url}/${locale}/cripto`,
      images: [{ url: site.seo.ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    alternates: {
      canonical: `${site.url}/${locale}/cripto`,
      languages: {
        it: `${site.url}/it/cripto`,
        en: `${site.url}/en/cripto`,
      },
    },
  }
}

export default async function CriptoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const validLocale = locale as Locale
  const c = COPY[validLocale]

  // JSON-LD: AcceptedPaymentMethod + FAQPage per le crypto-FAQ
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: site.name,
      url: `${site.url}/${validLocale}/cripto`,
      priceRange: '€80–€200',
      paymentAccepted: ['Bitcoin', 'Ethereum', 'USDC', 'USDT', 'Cryptocurrency', 'Credit Card', 'Cash', 'Airbnb'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.contact.address,
        postalCode: site.contact.postalCode,
        addressLocality: 'Milano',
        addressRegion: 'Lombardia',
        addressCountry: 'IT',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── HERO ─── */}
      <section className="relative h-[55vh] sm:h-[65vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={site.hero.image}
            alt={c.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/85" />
        </div>
        <Container className="relative pb-10 sm:pb-16 text-white">
          <Link
            href={`/${validLocale}`}
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-6 transition-colors"
          >
            {c.backToHome}
          </Link>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 mb-3">
            {c.eyebrow}
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.05] -tracking-tight max-w-4xl">
            {c.title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed">
            {c.intro}
          </p>
        </Container>
      </section>

      {/* ─── COSA ACCETTIAMO ─── */}
      <Section className="bg-stone-50 dark:bg-stone-950">
        <Container>
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">₿</span>
              <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
              {c.acceptedTitle}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.accepted.map((a, i) => (
              <div key={i} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-5">
                <p className="font-medium text-stone-900 dark:text-stone-100">{a.name}</p>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── COME FUNZIONA ─── */}
      <Section className="bg-stone-100 dark:bg-stone-900">
        <Container>
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
              {c.howTitle}
            </h2>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.how.map((step) => (
              <li key={step.n} className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-5 relative">
                <span className="absolute -top-3 -left-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700 dark:bg-amber-600 text-white font-serif text-sm font-bold shadow-md">
                  {step.n}
                </span>
                <p className="font-medium text-stone-900 dark:text-stone-100 mt-2">{step.title}</p>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ─── PERCHÉ CRIPTO ─── */}
      <Section className="bg-stone-50 dark:bg-stone-950">
        <Container>
          <div className="mb-10 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
              {c.whyTitle}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.why.map((w, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-2xl shrink-0 leading-none" aria-hidden="true">{w.icon}</span>
                <div>
                  <p className="font-medium text-stone-900 dark:text-stone-100">{w.title}</p>
                  <p className="mt-1 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── LE TRE CASE (riepilogo) ─── */}
      <Section className="bg-stone-100 dark:bg-stone-900">
        <Container>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight mb-10 text-center">
            {c.appsTitle}
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {site.properties.map((p) => (
              <Link
                key={p.slug}
                href={`/${validLocale}/case/${p.slug}`}
                className="group block bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-700">
                  <Image
                    src={p.cardImage}
                    alt={t(p.name, validLocale)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                    {t(p.name, validLocale)}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {p.features.guests} {validLocale === 'it' ? 'ospiti' : 'guests'} · ★ {p.ratings.overall.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── FAQ ─── */}
      <Section className="bg-stone-50 dark:bg-stone-950">
        <Container>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight mb-10 text-center max-w-3xl mx-auto">
            {c.faqTitle}
          </h2>
          <div className="max-w-2xl mx-auto divide-y divide-stone-200 dark:divide-stone-800">
            {c.faqs.map((f, i) => (
              <div key={i} className="py-5">
                <p className="font-medium text-stone-900 dark:text-stone-100 mb-2">{f.q}</p>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CTA ─── */}
      <Section className="bg-amber-800 dark:bg-amber-900 text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-4">
              {c.cta.title}
            </h2>
            <p className="text-white/90 leading-relaxed mb-8">
              {c.cta.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <WhatsAppButton locale={validLocale} variant="large" className="w-full sm:w-auto" />
              <a
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent(validLocale === 'it' ? 'Richiesta prenotazione in cripto' : 'Crypto booking request')}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white text-amber-800 hover:bg-amber-50 px-6 py-3.5 text-base font-medium transition-colors min-h-[48px]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {validLocale === 'it' ? 'Scrivici via email' : 'Email us'}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
