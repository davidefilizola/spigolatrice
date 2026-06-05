'use client'
import { MotionConfig } from 'framer-motion'

/**
 * Fa rispettare a TUTTE le animazioni framer-motion la preferenza di sistema
 * "riduci movimento" (prefers-reduced-motion). Con reducedMotion="user" framer
 * disabilita automaticamente trasformazioni e animazioni di layout per chi ha
 * attivato l'impostazione, mantenendo solo dissolvenze leggere.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
