'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Container from '@/core/components/Container'
import Section, { staggerItem } from '@/core/components/Section'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface PropertiesProps {
  locale: Locale
}

export default function Properties({ locale }: PropertiesProps) {
  return (
    <Section id="case" className="bg-stone-100 dark:bg-stone-900" stagger>
      <Container>
        <motion.div variants={staggerItem} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
              {locale === 'it' ? 'Le tre case' : 'The three homes'}
            </span>
            <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight -tracking-tight">
            {locale === 'it' ? 'Scegli la tua casa a Lambrate' : 'Choose your home in Lambrate'}
          </h2>
          <p className="mt-4 text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {locale === 'it'
              ? 'Tre appartamenti nello stesso quartiere, ciascuno con la sua personalità. Clicca per scoprirli.'
              : 'Three apartments in the same neighbourhood, each with its own personality. Click to discover them.'}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {site.properties.map((property) => (
            <motion.article
              key={property.slug}
              variants={staggerItem}
              className="group relative bg-white dark:bg-stone-800 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-900/5 dark:hover:shadow-black/30"
            >
              <Link
                href={`/${locale}/case/${property.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                aria-label={t(property.name, locale)}
              >
                {/* accent top line */}
                <span className="absolute inset-x-0 top-0 h-0.5 bg-amber-700 dark:bg-amber-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10" />

                <div className="relative h-56 bg-stone-200 dark:bg-stone-700 overflow-hidden">
                  <Image
                    src={property.cardImage}
                    alt={t(property.name, locale)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Rating badge top-right */}
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur px-2.5 py-1 text-xs font-medium text-stone-900 dark:text-stone-100 shadow-sm">
                    <svg className="h-3.5 w-3.5 fill-amber-500" viewBox="0 0 20 20">
                      <path d="M10 1.5l2.7 5.5 6 .9-4.3 4.2 1 6L10 15.3 4.6 18l1-6L1.3 7.9l6-.9z" />
                    </svg>
                    <span className="tabular-nums">{property.ratings.overall.toFixed(2).replace('.', ',')}</span>
                    <span className="text-stone-500 dark:text-stone-400">·</span>
                    <span className="text-stone-500 dark:text-stone-400 tabular-nums">{property.ratings.count}</span>
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-1.5">
                    {property.address}
                  </p>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100">
                    {t(property.name, locale)}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {t(property.tagline, locale)}
                  </p>

                  {/* Features row */}
                  <div className="mt-4 flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                    <span className="inline-flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {property.features.guests}
                    </span>
                    <span className="text-stone-300 dark:text-stone-700">·</span>
                    <span className="inline-flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12V8a2 2 0 012-2h14a2 2 0 012 2v4M3 12h18M3 12v6a2 2 0 002 2h14a2 2 0 002-2v-6M7 12V9a1 1 0 011-1h2a1 1 0 011 1v3M13 12V9a1 1 0 011-1h2a1 1 0 011 1v3" />
                      </svg>
                      {property.features.bedrooms} {locale === 'it' ? (property.features.bedrooms === 1 ? 'camera' : 'camere') : (property.features.bedrooms === 1 ? 'bedroom' : 'bedrooms')}
                    </span>
                    {property.features.outdoor && (
                      <>
                        <span className="text-stone-300 dark:text-stone-700">·</span>
                        <span>{t(property.features.outdoor, locale)}</span>
                      </>
                    )}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-500 group-hover:gap-2 transition-all">
                    {locale === 'it' ? 'Scopri la casa' : 'Discover the home'}
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
