'use client'
import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  /** Anima i figli in sequenza invece che tutta la sezione insieme. */
  stagger?: boolean
}

export default function Section({ children, id, className = '', stagger = false }: SectionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={
          {
            hidden: {},
            visible: stagger
              ? { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
              : {},
          } as Variants
        }
      >
        {stagger ? (
          children
        ) : (
          <motion.div
            variants={
              {
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: 'easeOut' },
                },
              } as Variants
            }
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

/** Variant da applicare ai figli quando Section ha stagger=true */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
