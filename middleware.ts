import { NextRequest, NextResponse } from 'next/server'

const locales = ['it', 'en']
const defaultLocale = 'it'

/**
 * Redirect 301 dalle URL del vecchio sito (spigolatricedilambrate.com su Zyro)
 * verso le nuove. Preserva eventuali backlink esistenti e dà a Google un
 * segnale chiaro di "stessa risorsa, nuova URL".
 *
 * Pattern: chiave = path esatto vecchio · valore = nuovo path (verrà
 * prefissato con /{locale} se non assoluto).
 */
const OLD_URL_REDIRECTS: Record<string, string> = {
  '/grossich': '/case/grossich',
  '/buschi': '/case/buschi',
  '/donegani': '/case/donegani',
  '/gallery': '/galleria',
  '/contact': '/#contatti',
  '/milan-apartments': '/#case',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1) Redirect 301 dalle vecchie URL del sito Zyro
  const redirectTarget = OLD_URL_REDIRECTS[pathname]
  if (redirectTarget) {
    const acceptLanguage = request.headers.get('accept-language') ?? ''
    const preferred = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    const locale = locales.includes(preferred) ? preferred : defaultLocale
    return NextResponse.redirect(new URL(`/${locale}${redirectTarget}`, request.url), 301)
  }

  // 2) Alias /{locale}/crypto → /{locale}/cripto (intercetta chi digita la versione EN)
  if (pathname === '/en/crypto' || pathname === '/it/crypto') {
    const locale = pathname.startsWith('/en') ? 'en' : 'it'
    return NextResponse.redirect(new URL(`/${locale}/cripto`, request.url), 301)
  }

  // 3) Redirect alla locale se manca
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (!hasLocale) {
    const acceptLanguage = request.headers.get('accept-language') ?? ''
    const preferred = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
    const locale = locales.includes(preferred) ? preferred : defaultLocale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)'],
}
