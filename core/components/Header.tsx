'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  const otherLocale: Locale = locale === 'it' ? 'en' : 'it'

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Quando trasparente (sopra hero) il testo è chiaro; quando scrollato è scuro.
  const linkColor = scrolled
    ? 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
    : 'text-stone-100/90 hover:text-white'

  const titleColor = scrolled
    ? 'text-stone-900 dark:text-stone-100'
    : 'text-white'

  return (
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
            className={`font-serif text-xl tracking-tight transition-colors ${titleColor}`}
          >
            {site.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {site.nav.map((item) => (
              <Link
                key={item.hash}
                href={`/${locale}${item.hash}`}
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
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950 py-3">
            {site.nav.map((item) => (
              <Link
                key={item.hash}
                href={`/${locale}${item.hash}`}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-sm text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
              >
                {t(item.label, locale)}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  )
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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  )
}
