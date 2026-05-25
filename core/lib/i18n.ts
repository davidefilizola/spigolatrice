export type Locale = 'it' | 'en'

export const locales: Locale[] = ['it', 'en']
export const defaultLocale: Locale = 'it'

/**
 * Estrae la stringa nella lingua corrente da un campo localizzato.
 *   t({ it: 'Ciao', en: 'Hi' }, 'it')  →  'Ciao'
 */
export function t<T>(field: { it: T; en: T }, locale: Locale): T {
  return field[locale]
}

export function isValidLocale(value: string): value is Locale {
  return (locales as string[]).includes(value)
}
