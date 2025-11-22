import { stagger } from 'motion/react'

export const springFadeUpStaggered = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
  delay: stagger(0.2, { startDelay: 0.2 }),
}
