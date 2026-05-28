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
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      // Setup non ancora pronto: fallback sull'API locale (logga, non invia)
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        })
        setStatus('success')
        form.reset()
      } catch {
        setStatus('error')
      }
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Nuova richiesta dal sito — ${name}`,
          from_name: 'Spigolatrice di Lambrate · sito',
          name,
          email,
          message,
          replyto: email,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setStatus('success')
        form.reset()
      } else {
        console.error('Web3Forms error:', data)
        setStatus('error')
      }
    } catch (err) {
      console.error('Contact form fetch error:', err)
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
              <p className="text-sm text-stone-700 dark:text-stone-300 mb-4">
                {locale === 'it'
                  ? 'Contattaci direttamente'
                  : 'Reach us directly'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <WhatsAppButton locale={locale} variant="large" className="w-full" />
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-700 px-4 py-3.5 text-sm font-medium transition-colors min-h-[48px]"
                  aria-label={locale === 'it' ? `Chiama ${site.contact.phone}` : `Call ${site.contact.phone}`}
                >
                  <svg className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="truncate">{locale === 'it' ? 'Chiama' : 'Call'}</span>
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-700 px-4 py-3.5 text-sm font-medium transition-colors min-h-[48px]"
                  aria-label={locale === 'it' ? `Scrivi a ${site.contact.email}` : `Email ${site.contact.email}`}
                >
                  <svg className="h-5 w-5 shrink-0 text-amber-700 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{locale === 'it' ? 'Email' : 'Email'}</span>
                </a>
              </div>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-4 gap-1 text-xs text-stone-500 dark:text-stone-400 text-center">
                <span className="tabular-nums">{site.contact.phone}</span>
                <span className="hidden sm:inline text-stone-300 dark:text-stone-700">·</span>
                <span className="break-all">{site.contact.email}</span>
              </div>
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
