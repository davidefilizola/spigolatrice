'use client'
import { useState } from 'react'
import Link from 'next/link'
import Container from '@/core/components/Container'
import Section from '@/core/components/Section'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface FAQProps {
  locale: Locale
  /** Se passato, mostra solo le prime N FAQ e aggiunge un link verso /faq. */
  limit?: number
}

export default function FAQ({ locale, limit }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = limit ? site.faq.items.slice(0, limit) : site.faq.items
  const hasMore = limit !== undefined && site.faq.items.length > limit

  return (
    <Section id="faq">
      <Container>
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-stone-900 dark:text-stone-100 mb-14">
          {t(site.faq.title, locale)}
        </h2>
        <div className="max-w-2xl mx-auto divide-y divide-stone-200 dark:divide-stone-800">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i}>
                <button
                  className="flex w-full items-center justify-between py-5 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors pr-4">
                    {t(item.q, locale)}
                  </span>
                  <span
                    className="shrink-0 text-stone-400 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <ChevronIcon />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                      {t(item.a, locale)}
                    </p>
                    {'link' in item && item.link && (
                      <Link
                        href={`/${locale}${item.link.href}`}
                        className="inline-flex items-center gap-1.5 pb-5 text-sm font-medium text-amber-700 dark:text-amber-500 hover:underline"
                      >
                        {t(item.link.label, locale)}
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/faq`}
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-500 hover:underline"
            >
              {locale === 'it'
                ? `Vedi tutte le ${site.faq.items.length} domande`
                : `See all ${site.faq.items.length} questions`}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </Container>
    </Section>
  )
}

function ChevronIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )
}
