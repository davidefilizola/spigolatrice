'use client'
import { useEffect } from 'react'
import type { Locale } from '@/core/lib/i18n'

/**
 * Allinea l'attributo <html lang> al locale corrente (it/en).
 * Il root layout non conosce il locale (è in un segmento [locale] annidato) e
 * leggere gli header lì renderebbe tutto dinamico, perdendo la generazione
 * statica. Lo correggiamo lato client, come fa next-themes con la classe dark.
 */
export default function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  return null
}
