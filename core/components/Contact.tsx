'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Container from '@/core/components/Container'
import Button from '@/core/components/Button'
import Section from '@/core/components/Section'
import WhatsAppButton from '@/core/components/WhatsAppButton'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

const MapComponent = dynamic(() => import('@/core/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-lg bg-stone-200 dark:bg-stone-800 animate-pulse" />
  ),
})

interface ContactProps {
  locale: Locale
}

export default function Contact({ locale }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const f = site.contactSection.form

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 px-3.5 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition'

  return (
    <Section id="contatti">
      <Container>
        <h2 className="font-serif text-3xl sm:text-4xl text-center text-stone-900 dark:text-stone-100 mb-14">
          {t(site.contactSection.title, locale)}
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {/* WhatsApp shortcut */}
            <div className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 p-5">
              <p className="text-sm text-stone-700 dark:text-stone-300 mb-3">
                {locale === 'it'
                  ? 'Preferisci scriverci subito?'
                  : 'Prefer to message us now?'}
              </p>
              <WhatsAppButton locale={locale} variant="large" className="w-full sm:w-auto" />
            </div>

            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500">
              <span className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
              <span>{locale === 'it' ? 'o usa il form' : 'or use the form'}</span>
              <span className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
            </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                {t(f.name, locale)}
              </label>
              <input name="name" type="text" required className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                {t(f.email, locale)}
              </label>
              <input name="email" type="email" required className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                {t(f.message, locale)}
              </label>
              <textarea name="message" rows={5} required className={`${inputCls} resize-none`} />
            </div>

            {status === 'success' && (
              <p className="text-sm text-green-600 dark:text-green-400">{t(f.success, locale)}</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-600 dark:text-red-400">{t(f.error, locale)}</p>
            )}

            <Button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto">
              {status === 'sending' ? '...' : t(f.send, locale)}
            </Button>
          </form>
          </div>

          <div className="h-72 md:h-[28rem] rounded-lg overflow-hidden shadow-sm">
            <MapComponent
              lat={site.contact.coordinates.lat}
              lng={site.contact.coordinates.lng}
              name={site.name}
              address={site.contact.address}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
