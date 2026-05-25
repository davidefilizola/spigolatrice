import Image from 'next/image'
import Container from '@/core/components/Container'
import Section from '@/core/components/Section'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface AboutProps {
  locale: Locale
}

export default function About({ locale }: AboutProps) {
  return (
    <Section id="chi-siamo">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
                {t(site.about.eyebrow, locale)}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-[1.15] -tracking-tight">
              {t(site.about.title, locale)}
            </h2>
            <div className="mt-7 space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
              {site.about.body.map((paragraph, i) => (
                <p key={i}>{t(paragraph, locale)}</p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 shadow-sm">
            <Image
              src={site.about.image}
              alt={t(site.about.title, locale)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
