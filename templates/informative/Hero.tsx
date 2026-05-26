import Image from 'next/image'
import Container from '@/core/components/Container'
import Button from '@/core/components/Button'
import ScrollIndicator from '@/core/components/ScrollIndicator'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface HeroProps {
  locale: Locale
}

export default function Hero({ locale }: HeroProps) {
  return (
    <div className="relative min-h-svh flex items-center overflow-hidden">
      {/* Background image (Ken Burns) + overlays */}
      <div className="absolute inset-0 bg-stone-900 overflow-hidden">
        <Image
          src={site.hero.image}
          alt={site.name}
          fill
          priority
          className="object-cover opacity-65 kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5))]" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="block h-px w-10 bg-amber-400" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
              {t(site.hero.eyebrow, locale)}
            </span>
          </div>
          <h1 className="font-serif text-4xl text-white sm:text-5xl lg:text-7xl leading-[1.05] -tracking-tight">
            {t(site.hero.title, locale)}
          </h1>
          <p className="mt-7 text-lg text-stone-200/90 max-w-xl leading-relaxed">
            {t(site.hero.subtitle, locale)}
          </p>
          <div className="mt-10">
            <Button href={`/${locale}#contatti`} variant="primary">
              {t(site.hero.cta, locale)}
            </Button>
          </div>
        </div>
      </Container>

      <ScrollIndicator />
    </div>
  )
}
