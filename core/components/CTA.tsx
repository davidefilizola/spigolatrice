import Container from '@/core/components/Container'
import Button from '@/core/components/Button'
import Section from '@/core/components/Section'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface CTAProps {
  locale: Locale
}

export default function CTA({ locale }: CTAProps) {
  return (
    <Section className="bg-amber-800 dark:bg-amber-900">
      <Container className="text-center">
        <h2 className="font-serif text-3xl text-white sm:text-4xl leading-tight">
          {t(site.cta.title, locale)}
        </h2>
        <p className="mt-4 text-amber-100 max-w-lg mx-auto">{t(site.cta.description, locale)}</p>
        <div className="mt-10">
          <Button
            href={`/${locale}#contatti`}
            className="border border-white/60 bg-white/10 text-white hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20"
          >
            {t(site.cta.button, locale)}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
