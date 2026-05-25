import { site } from '@/content/site'
import { t, type Locale } from '@/core/lib/i18n'

interface WhatsAppButtonProps {
  locale: Locale
  variant?: 'link' | 'button' | 'large'
  className?: string
}

export default function WhatsAppButton({
  locale,
  variant = 'button',
  className = '',
}: WhatsAppButtonProps) {
  const digits = site.contact.phone.replace(/\D/g, '')
  const message = encodeURIComponent(t(site.contact.whatsappMessage, locale))
  const href = `https://wa.me/${digits}?text=${message}`

  if (variant === 'link') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors w-fit ${className}`}
      >
        <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
        WhatsApp
      </a>
    )
  }

  const sizeCls =
    variant === 'large'
      ? 'px-6 py-3.5 text-base gap-3'
      : 'px-5 py-2.5 text-sm gap-2'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-md bg-[#25D366] hover:bg-[#1ebd5b] text-white font-medium transition-colors shadow-sm ${sizeCls} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      WhatsApp
    </a>
  )
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.030-.967-.273-.099-.471-.148-.670.15-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.130-.606.134-.133.297-.347.446-.520.149-.174.198-.298.297-.497.099-.198.050-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.500-.669-.510-.173-.008-.371-.010-.570-.010-.198 0-.520.074-.792.371-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.200 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.360.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.870 9.870 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.860 9.860 0 01-1.51-5.260c.001-5.45 4.436-9.884 9.888-9.884 2.641 0 5.122 1.030 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.450-4.437 9.884-9.885 9.884m8.413-18.298A11.815 11.815 0 0012.050 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.480-8.413z" />
    </svg>
  )
}
