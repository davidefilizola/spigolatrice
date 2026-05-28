import credits from '../../../public/images/quartiere/credits.json'
import { t, type Locale } from '@/core/lib/i18n'

interface Credit {
  file: string
  title: string
  caption: { it: string; en: string }
  license: string
  licenseUrl: string
  author: string
  sourceUrl: string
}

interface Props {
  locale: Locale
}

/**
 * Attribuzioni richieste dalle licenze CC-BY/CC-BY-SA delle foto Wikimedia
 * Commons usate nella gallery quartiere.
 * Server component: i metadati vengono caricati a build time da credits.json.
 */
export default function PhotoCredits({ locale }: Props) {
  const list = credits as Credit[]
  if (!list || list.length === 0) return null

  return (
    <div className="border-t border-stone-200 dark:border-stone-800 pt-8 mt-12">
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400 mb-4">
        {locale === 'it' ? 'Crediti fotografici' : 'Photo credits'}
      </h3>
      <ul className="space-y-1.5 text-xs text-stone-500 dark:text-stone-400">
        {list.map((c) => (
          <li key={c.file}>
            <a
              href={c.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t(c.caption, locale)}
            </a>
            {' · '}
            <span>{c.author}</span>
            {' · '}
            <a
              href={c.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {c.license}
            </a>
            {' · Wikimedia Commons'}
          </li>
        ))}
      </ul>
    </div>
  )
}
