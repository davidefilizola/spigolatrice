'use client'
import { useState } from 'react'
import Container from '@/core/components/Container'
import Section from '@/core/components/Section'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface FAQProps {
  locale: Locale
}

export default function FAQ({ locale }: FAQProps) {
  // Trova il primo highlight: aperto di default per dare risposta immediata
  const firstHighlight = site.faq.items.findIndex((it) => 'highlight' in it && it.highlight)
  const [openIndex, setOpenIndex] = useState<number | null>(firstHighlight >= 0 ? firstHighlight : null)

  return (
    <Section id="faq">
      <Container>
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-stone-900 dark:text-stone-100 mb-14">
          {t(site.faq.title, locale)}
        </h2>
        <div className="max-w-2xl mx-auto space-y-2">
          {site.faq.items.map((item, i) => {
            const isOpen = openIndex === i
            const isHighlight = 'highlight' in item && item.highlight
            return (
              <div
                key={i}
                className={`rounded-lg border transition-colors ${
                  isHighlight
                    ? 'border-amber-200 dark:border-amber-700/40 bg-amber-50/60 dark:bg-amber-900/10'
                    : 'border-stone-200 dark:border-stone-800 bg-transparent'
                }`}
              >
                <button
                  className="flex w-full items-center justify-between px-4 py-4 text-left group gap-3"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 min-w-0">
                    {isHighlight && (
                      <span className="inline-flex items-center gap-1 mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                        <span className="block h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                        {locale === 'it' ? 'Domanda frequente' : 'Top question'}
                      </span>
                    )}
                    <span className={`block font-medium pr-2 transition-colors ${
                      isHighlight
                        ? 'text-stone-900 dark:text-stone-100'
                        : 'text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400'
                    }`}>
                      {t(item.q, locale)}
                    </span>
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
                    <p className="px-4 pb-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      {t(item.a, locale)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
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
