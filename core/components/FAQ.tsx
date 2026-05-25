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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="faq">
      <Container>
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-stone-900 dark:text-stone-100 mb-14">
          {t(site.faq.title, locale)}
        </h2>
        <div className="max-w-2xl mx-auto divide-y divide-stone-200 dark:divide-stone-800">
          {site.faq.items.map((item, i) => {
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
                    <p className="pb-5 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
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
