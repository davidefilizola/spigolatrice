'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Container from '@/core/components/Container'
import Section, { staggerItem } from '@/core/components/Section'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface SocialProofProps {
  locale: Locale
}

/**
 * Sezione "social proof": rating aggregati delle 3 case + 4 recensioni 5★
 * (mix di lingue) + mosaico di 4 post-it scritti a mano lasciati dagli ospiti.
 *
 * Sostituisce concettualmente la vecchia "About" — Pamela come host viene
 * raccontata indirettamente attraverso le voci degli ospiti.
 */
export default function SocialProof({ locale }: SocialProofProps) {
  const sp = site.socialProof

  // Recensioni hand-picked: cerco per autore in ciascuna casa
  const reviews = sp.featuredReviews
    .map((sel) => {
      const property = site.properties.find((p) => p.slug === sel.property)
      if (!property) return null
      const review = property.reviews.find((r) => r.author === sel.author)
      if (!review) return null
      return { property, review }
    })
    .filter((x): x is { property: typeof site.properties[number]; review: typeof site.properties[number]['reviews'][number] } => x !== null)

  // Totali rating
  const totalReviews = site.properties.reduce((sum, p) => sum + p.ratings.count, 0)

  return (
    <Section id="chi-siamo" className="bg-stone-100 dark:bg-stone-900" stagger>
      <Container>
        <motion.div variants={staggerItem} className="text-center mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
              {t(sp.eyebrow, locale)}
            </span>
            <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight -tracking-tight">
            {t(sp.title, locale)}
          </h2>
          <p className="mt-5 text-stone-600 dark:text-stone-400 leading-relaxed">
            {t(sp.intro, locale)}
          </p>
        </motion.div>

        {/* ─── Strip metriche per casa ─── */}
        <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-14">
          {site.properties.map((p) => (
            <div
              key={p.slug}
              className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-5 text-center"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <svg className="h-5 w-5 fill-amber-500" viewBox="0 0 20 20">
                  <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9z" />
                </svg>
                <span className="font-serif text-3xl text-stone-900 dark:text-stone-100 tabular-nums">
                  {p.ratings.overall.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                {t(p.name, locale)} · {p.ratings.count} {locale === 'it' ? 'recensioni' : 'reviews'}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ─── Reviews ↔ Post-it allineati a coppie ───
            Desktop (sm+): grid 2 col, ogni riga ha review (sinistra) + post-it (destra)
            Mobile: stack — review, post-it, review, post-it...
            Alterniamo lato: sul mobile evita doppio "blocco" review consecutivo.
        */}
        <motion.div variants={staggerItem} className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {reviews.map(({ property, review }, i) => {
            const postit = sp.postit[i % sp.postit.length]
            return (
              <div key={i} className="contents">
                {/* Review card */}
                <article className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-5 flex flex-col justify-center min-h-[180px] sm:min-h-[220px]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-stone-900 dark:text-stone-100">{review.author}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {review.location ? `${review.location} · ` : ''}
                        {review.date} · {t(property.name, locale)}
                      </p>
                    </div>
                    <span className="flex gap-0.5 shrink-0 mt-1" aria-label="5 stelle">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <svg key={j} className="h-3.5 w-3.5 fill-amber-500" viewBox="0 0 20 20">
                          <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9z" />
                        </svg>
                      ))}
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </article>

                {/* Post-it accoppiato */}
                <div className="flex items-center justify-center">
                  <div
                    className="relative w-full max-w-[280px] sm:max-w-none aspect-square rounded-xl overflow-hidden shadow-lg shadow-stone-900/10 dark:shadow-black/30 bg-stone-200 dark:bg-stone-800 border-4 border-white dark:border-stone-700"
                    style={{ transform: `rotate(${postit.tilt}deg)` }}
                  >
                    <Image
                      src={postit.src}
                      alt={postit.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 22vw"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* CTA centrale */}
        <motion.div variants={staggerItem} className="mt-10 text-center">
          <a
            href={site.social.airbnbHost}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-500 hover:underline"
          >
            {t(sp.ctaLabel, locale)}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <p className="mt-4 text-xs text-stone-500 dark:text-stone-400 italic">
            {locale === 'it'
              ? 'Alcuni biglietti lasciati dagli ospiti sul muro di casa.'
              : 'Some of the notes guests have left on the apartment wall.'}
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}
