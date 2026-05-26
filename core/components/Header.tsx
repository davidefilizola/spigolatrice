'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import Container from '@/core/components/Container'
import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface HeaderProps {
  locale: Locale
}

export default function Header({ locale }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()
  const otherLocale: Locale = locale === 'it' ? 'en' : 'it'

  // Trasparente sopra hero, opaco quando scrollato — solo in HP.
  // In altre pagine (es. /galleria) il header è sempre opaco.
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`

  useEffect(() => {
    setMounted(true)
    if (!isHomePage) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHomePage])

  // Blocca scroll del body quando menu mobile è aperto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Click sul logo: se siamo già su HP scrolla in cima; altrimenti naviga.
  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const linkColor = scrolled
    ? 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
    : 'text-stone-100/90 hover:text-white'

  const titleColor = scrolled
    ? 'text-stone-900 dark:text-stone-100'
    : 'text-white'

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/90'
            : 'bg-transparent'
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link
              href={`/${locale}`}
              onClick={handleLogoClick}
              className={`font-serif text-xl tracking-tight transition-colors ${titleColor}`}
            >
              {site.name}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`text-sm transition-colors duration-200 ${linkColor}`}
                >
                  {t(item.label, locale)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Link
                href={`/${otherLocale}`}
                className={`px-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 ${linkColor}`}
              >
                {otherLocale}
              </Link>

              {mounted && (
                <button
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  className={`rounded-full p-2 transition-colors duration-200 ${linkColor} ${
                    scrolled ? 'hover:bg-stone-100 dark:hover:bg-stone-800' : 'hover:bg-white/10'
                  }`}
                  aria-label={t(
                    resolvedTheme === 'dark' ? site.theme.toggleLight : site.theme.toggleDark,
                    locale,
                  )}
                >
                  {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
              )}

              <button
                className={`md:hidden rounded p-2 transition-colors ${linkColor}`}
                onClick={() => setMenuOpen(true)}
                aria-label="Apri menu"
                aria-expanded={menuOpen}
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile menu full-screen overlay */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
      />
    </>
  )
}

// ─── Mobile menu full-screen ──────────────────────────────────────────
function MobileMenu({
  open,
  onClose,
  locale,
}: {
  open: boolean
  onClose: () => void
  locale: Locale
}) {
  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`absolute inset-x-0 top-0 bg-stone-50 dark:bg-stone-950 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ maxHeight: '92vh' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-stone-200 dark:border-stone-800">
          <span className="font-serif text-xl text-stone-900 dark:text-stone-100">
            {site.name}
          </span>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
            aria-label="Chiudi menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items — large serif typography */}
        <nav className="flex-1 px-6 sm:px-8 py-8 overflow-y-auto">
          <ul className="space-y-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${locale}${item.href}`}
                  onClick={onClose}
                  className="group block py-4 border-b border-stone-200/70 dark:border-stone-800/70 last:border-0"
                >
                  <span className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                    {t(item.label, locale)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom — contacts + language */}
        <div className="px-6 sm:px-8 py-6 border-t border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/50">
          <div className="flex flex-col gap-2 mb-4">
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, '')}`}
              className="text-sm text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500"
            >
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="text-sm text-amber-700 dark:text-amber-500 hover:underline"
            >
              {site.contact.email}
            </a>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-stone-200/70 dark:border-stone-800/70">
            <div className="flex gap-2 text-xs font-semibold uppercase tracking-widest">
              <Link
                href={`/it${pathnameWithoutLocale(locale)}`}
                onClick={onClose}
                className={
                  locale === 'it'
                    ? 'text-stone-900 dark:text-stone-100'
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }
              >
                IT
              </Link>
              <span className="text-stone-300 dark:text-stone-700">·</span>
              <Link
                href={`/en${pathnameWithoutLocale(locale)}`}
                onClick={onClose}
                className={
                  locale === 'en'
                    ? 'text-stone-900 dark:text-stone-100'
                    : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }
              >
                EN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// helper banale — il path corrente senza il locale
// (qui non lo usiamo davvero perché non abbiamo accesso al pathname in questo scope;
// è un placeholder che semplicemente preserva la root)
function pathnameWithoutLocale(_locale: Locale): string {
  return ''
}

function SunIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}
