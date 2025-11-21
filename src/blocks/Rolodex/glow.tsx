'use client'

import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const GlowDesktop = ({
  backgroundImage,
  isInView,
  className,
}: {
  backgroundImage: string | MediaType | null | undefined
  isInView: boolean
  className?: string
}) => {
  if (!backgroundImage) return null

  return (
    <motion.div
      className={cn('absolute inset-0 z-[-1]', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        animate={{
          rotateY: [12, -12, 12],
          translateY: [6, -6, 6],
          opacity: [100, 80, 100],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
          top: '56%',
          left: '60%',
          y: '-44%',
          x: '-53%',
          width: '2000px',
          height: '2000px',
        }}
        className="fixed z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>
    </motion.div>
  )
}

const GlowMobile = ({
  backgroundImage,
  isInView,
  className,
}: {
  backgroundImage: string | MediaType | null | undefined
  isInView: boolean
  className?: string
}) => {
  if (!backgroundImage) return null

  return (
    <motion.div
      className={cn('absolute inset-0 z-[-1]', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        animate={{
          rotateY: [12, -12, 12],
          translateY: [6, -6, 6],
          opacity: [100, 80, 100],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
          top: '75%',
          left: '40%',
          y: '-50%',
          x: '-50%',
          width: '1300px',
          height: '1300px',
        }}
        className="fixed z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>
    </motion.div>
  )
}

export { GlowDesktop, GlowMobile }
