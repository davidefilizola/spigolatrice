import { NextRequest, NextResponse } from 'next/server'

const locales = ['it', 'en']
const defaultLocale = 'it'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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
