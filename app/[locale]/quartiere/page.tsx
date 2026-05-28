import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import Container from '@/core/components/Container'
import Section from '@/core/components/Section'
import { site } from '@/content/site'
import { locales, isValidLocale, t, type Locale } from '@/core/lib/i18n'
import QuartiereGallery from './QuartiereGallery'
import PhotoCredits from './PhotoCredits'

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
  const title = `${t(site.neighborhood.title, validLocale)} · ${site.name}`
  const description = t(site.neighborhood.intro, validLocale)
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${site.url}/${locale}/quartiere`,
      images: [{ url: site.neighborhood.gallery[0].src, width: 1600, height: 900 }],
      type: 'website',
    },
    alternates: {
      canonical: `${site.url}/${locale}/quartiere`,
      languages: {
        it: `${site.url}/it/quartiere`,
        en: `${site.url}/en/quartiere`,
      },
    },
  }
}

// Blocchi tematici della pagina, in ordine di scorrimento
const TOPICS = [
  {
    icon: '🚇',
    title: { it: 'Trasporti & aeroporti', en: 'Transport & airports' },
    paragraphs: [
      {
        it: 'A due minuti a piedi trovi la **metro M2** (linea verde) di Lambrate e la **stazione FS di Lambrate**, una delle stazioni ferroviarie principali di Milano: regionali, intercity, alta velocità (Frecciarossa per Roma, Venezia, Torino, Bologna).',
        en: 'Two minutes on foot from the **M2 metro** (green line) and **Lambrate railway station**, one of Milan\'s main rail hubs: regional, intercity and high-speed trains (Frecciarossa to Rome, Venice, Turin, Bologna).',
      },
      {
        it: '**Aeroporti**: Linate ~15 min con bus diretto da piazza Bottini, Malpensa ~50 min col Malpensa Express dalla Stazione Centrale (10 min da casa), Bergamo Orio ~1h15 con bus diretto.',
        en: '**Airports**: Linate ~15 min by direct bus from Piazza Bottini, Malpensa ~50 min via the Malpensa Express from Milano Centrale (10 min from home), Bergamo Orio ~1h15 by direct bus.',
      },
      {
        it: 'A pochi passi tram, autobus, taxi e car sharing. **L\'auto non serve**, ma se ce l\'hai c\'è un parcheggio custodito sotto casa.',
        en: 'Trams, buses, taxis and car sharing within easy reach. **You don\'t need a car**, but if you have one there\'s a guarded car park downstairs.',
      },
    ],
  },
  {
    icon: '🛒',
    title: { it: 'Servizi quotidiani', en: 'Daily services' },
    paragraphs: [
      {
        it: 'Il **supermercato Carrefour** sotto casa è aperto dalle **7 a mezzanotte**, sette giorni su sette. Nelle vicinanze trovi anche Esselunga, Penny Market, farmacie aperte la sera, banche e uffici postali.',
        en: 'The **Carrefour supermarket** nearby is open **7 a.m. to midnight**, seven days a week. Esselunga, Penny Market, late-night pharmacies, banks and post offices are also close by.',
      },
    ],
  },
  {
    icon: '🎓',
    title: { it: 'Università e ricerca', en: 'University & research' },
    paragraphs: [
      {
        it: 'Lambrate è a due passi dal **Politecnico di Milano · Campus Leonardo** (Piazza Leonardo da Vinci) e dall\'**Università Statale di Milano · Città Studi**. Nelle vicinanze anche il **CNR** (Consiglio Nazionale delle Ricerche).',
        en: 'Lambrate is a stone\'s throw from **Politecnico di Milano · Leonardo Campus** (Piazza Leonardo da Vinci) and the **University of Milan · Città Studi campus**. The **CNR** (National Research Council) is also nearby.',
      },
    ],
  },
  {
    icon: '🍝',
    title: { it: 'Mangiare e bere', en: 'Eat & drink' },
    paragraphs: [
      {
        it: 'Una concentrazione altissima di **ristoranti, bar, pizzerie e locali per l\'aperitivo**. Lambrate è famosa per le sue serate tranquille ma vivaci: birrifici artigianali, trattorie milanesi, cucine etniche, gelaterie. NoLo è a pochi minuti.',
        en: 'A great density of **restaurants, bars, pizzerias and aperitivo spots**. Lambrate is known for chilled-out yet lively evenings: craft breweries, Milanese trattorias, international cuisines, ice-cream parlours. NoLo is minutes away.',
      },
    ],
  },
  {
    icon: '🌳',
    title: { it: 'Design ed eventi', en: 'Design & events' },
    paragraphs: [
      {
        it: '**Via Ventura** è una delle vie più creative di Milano: durante il **Fuori Salone** ospita mostre, installazioni e showroom di design internazionale. Tutto l\'anno **East Market** porta vintage, antiquariato e street food. Tutti raggiungibili a piedi.',
        en: '**Via Ventura** is one of Milan\'s most creative streets: during the **Fuori Salone** it hosts international design exhibitions and showrooms. All year round **East Market** brings vintage, antiques and street food. All within walking distance.',
      },
    ],
  },
  {
    icon: '🏥',
    title: { it: 'Strutture sanitarie', en: 'Healthcare' },
    paragraphs: [
      {
        it: 'A pochi minuti: **Istituto Nazionale dei Tumori** (via Venezian), **Istituto Neurologico Carlo Besta** (via Celoria), **Istituto Clinico Città Studi** (via Jommelli). Una delle aree con la più alta concentrazione di centri di eccellenza sanitaria in Italia.',
        en: 'Minutes away: **Istituto Nazionale dei Tumori** (Via Venezian), **Istituto Neurologico Carlo Besta** (Via Celoria), **Istituto Clinico Città Studi** (Via Jommelli). One of Italy\'s highest concentrations of healthcare centres of excellence.',
      },
    ],
  },
  {
    icon: '🏛',
    title: { it: 'Centro Milano in 10 minuti', en: 'Milan city centre in 10 minutes' },
    paragraphs: [
      {
        it: 'Con la M2 di Lambrate raggiungi **Piazza Duomo, Brera, il Castello Sforzesco e la Stazione Centrale in dieci minuti**. Da lì tutta Milano è a portata di mano.',
        en: 'On the M2 from Lambrate you reach **Piazza Duomo, Brera, Castello Sforzesco and Milano Centrale in ten minutes**. From there, all of Milan is within easy reach.',
      },
    ],
  },
] as const

// Helper per rendering testo con **grassetto**
function renderText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-stone-900 dark:text-stone-100">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default async function QuartierePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const validLocale = locale as Locale
  const n = site.neighborhood
  const heroImage = n.gallery[0]

  return (
    <>
      {/* ─── HERO compatto ─── */}
      <section className="relative h-[50vh] sm:h-[60vh] min-h-[380px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" />
        </div>
        <Container className="relative pb-10 sm:pb-16 text-white">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-300 mb-3">
            {t(n.eyebrow, validLocale)}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] -tracking-tight max-w-3xl">
            {t(n.title, validLocale)}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/90 max-w-2xl">
            {t(n.intro, validLocale)}
          </p>
        </Container>
      </section>

      {/* ─── BLOCCHI TEMATICI ─── */}
      <Section className="bg-stone-50 dark:bg-stone-950">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
            {TOPICS.map((topic, i) => (
              <article key={i} className="flex gap-5 sm:gap-7">
                <div className="text-3xl sm:text-4xl shrink-0 leading-none mt-1" aria-hidden="true">
                  {topic.icon}
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 mb-3 leading-tight">
                    {t(topic.title, validLocale)}
                  </h2>
                  <div className="space-y-3">
                    {topic.paragraphs.map((p, j) => (
                      <p key={j} className="text-stone-700 dark:text-stone-300 leading-relaxed">
                        {renderText(t(p, validLocale))}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── GALLERY COMPLETA ─── */}
      <Section className="bg-stone-100 dark:bg-stone-900">
        <Container>
          <div className="mb-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
                {validLocale === 'it' ? 'Foto' : 'Photos'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
              {validLocale === 'it' ? 'Lambrate in immagini' : 'Lambrate in pictures'}
            </h2>
            <p className="mt-3 text-sm text-stone-500 dark:text-stone-400 tabular-nums">
              {n.gallery.length} {validLocale === 'it' ? 'fotografie' : 'photographs'}
            </p>
          </div>
          <QuartiereGallery locale={validLocale} />
          <PhotoCredits locale={validLocale} />
        </Container>
      </Section>
    </>
  )
}
