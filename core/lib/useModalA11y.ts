import { useEffect, useRef } from 'react'

interface Options {
  /**
   * Se true, il tasto "indietro" del browser/telefono chiude il modal
   * (utile per overlay a schermo intero come il lightbox). In più Esc passa
   * dallo stesso percorso, così lo stato di history aggiunto viene consumato.
   */
  backButton?: boolean
}

/**
 * Comportamenti standard di accessibilità per un modal/overlay, riusabili.
 * - blocca lo scroll del body mentre è aperto
 * - sposta il focus dentro all'apertura e lo intrappola (Tab ciclico)
 * - ripristina il focus all'elemento di partenza alla chiusura
 * - Esc chiude
 * - opzionale: il tasto "indietro" del browser/telefono chiude
 *
 * Ritorna una ref da attaccare al contenitore del modal.
 */
export function useModalA11y<T extends HTMLElement = HTMLElement>(
  isOpen: boolean,
  onClose: () => void,
  { backButton = false }: Options = {}
) {
  const ref = useRef<T>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!isOpen) return
    const node = ref.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusables = () =>
      node
        ? Array.from(
            node.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null)
        : []

    getFocusables()[0]?.focus()

    if (backButton) window.history.pushState({ modal: true }, '')
    const onPop = () => onCloseRef.current()
    if (backButton) window.addEventListener('popstate', onPop)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        if (backButton) window.history.back()
        else onCloseRef.current()
        return
      }
      if (e.key === 'Tab') {
        const items = getFocusables()
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
      if (backButton) window.removeEventListener('popstate', onPop)
      previouslyFocused?.focus?.()
    }
  }, [isOpen, backButton])

  return ref
}
