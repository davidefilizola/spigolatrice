'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Container from '@/core/components/Container'
import Section, { staggerItem } from '@/core/components/Section'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface ServicesProps {
  locale: Locale
}

export default function Services({ locale }: ServicesProps) {
  return (
    <Section id="servizi" className="bg-stone-100 dark:bg-stone-900" stagger>
      <Container>
        <motion.div variants={staggerItem} className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-500">
              {t(site.services.eyebrow, locale)}
            </span>
            <span className="block h-px w-10 bg-amber-700 dark:bg-amber-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight -tracking-tight">
            {t(site.services.title, locale)}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {site.services.items.map((service) => (
            <motion.article
              key={service.image}
              variants={staggerItem}
              className="group relative bg-white dark:bg-stone-800 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-900/5 dark:hover:shadow-black/30"
            >
              {/* accent top line */}
              <span className="absolute inset-x-0 top-0 h-0.5 bg-amber-700 dark:bg-amber-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {service.image && (
                <div className="relative h-48 bg-stone-200 dark:bg-stone-700 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={t(service.title, locale)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                {service.icon && (
                  <span className="text-2xl mb-3 block" aria-hidden="true">
                    {service.icon}
                  </span>
                )}
                <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100">
                  {t(service.title, locale)}
                </h3>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {t(service.description, locale)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
