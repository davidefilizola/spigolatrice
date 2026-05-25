import Link from 'next/link'
import Container from '@/core/components/Container'
import WhatsAppButton from '@/core/components/WhatsAppButton'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface FooterProps {
  locale: Locale
}

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
      <Container className="py-14">
        <div className="grid sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg text-stone-900 dark:text-stone-100">{site.name}</p>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              {site.contact.address}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2">
            {site.nav.map((item) => (
              <Link
                key={item.hash}
                href={`/${locale}${item.hash}`}
                className="w-fit text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
              >
                {t(item.label, locale)}
              </Link>
            ))}
          </nav>

          {/* Contact + Social */}
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className="w-fit text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
            >
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="w-fit text-sm text-amber-700 dark:text-amber-500 hover:underline"
            >
              {site.contact.email}
            </a>
            <WhatsAppButton locale={locale} variant="link" className="mt-0.5" />
            <div className="mt-2 flex gap-4">
              {site.social.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
                >
                  Instagram
                </a>
              )}
              {site.social.facebook && (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-stone-400 dark:text-stone-600">
          © {new Date().getFullYear()} {site.name}. {t(site.footer.rights, locale)}.
        </p>
      </Container>
    </footer>
  )
}
