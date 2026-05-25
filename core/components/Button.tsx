import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps {
  href?: string
  variant?: Variant
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-amber-700 text-white hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700',
  secondary:
    'border border-stone-800 text-stone-800 hover:bg-stone-100 dark:border-stone-200 dark:text-stone-200 dark:hover:bg-stone-800',
  ghost:
    'text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100',
}

const base =
  'inline-flex items-center justify-center rounded px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer'

export default function Button({
  href,
  variant = 'primary',
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}
