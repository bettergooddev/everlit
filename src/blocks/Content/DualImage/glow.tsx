'use client'

import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const GlowDesktop = ({
  backgroundImage,
  className,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
}) => {
  if (!backgroundImage) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -my-[42rem]">
      <motion.div
        initial={{
          opacity: 0,
          rotate: -90,
          bottom: '424px',
          left: '-400px',
          y: '0px',
          x: '0px',
          width: '2000px',
          height: '2000px',
        }}
        animate={{
          opacity: 1,
          rotate: -90,
          bottom: '424px',
          left: '-400px',
          y: '0px',
          x: '0px',
          width: '2000px',
          height: '2000px',
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
          opacity: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
          rotateY: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          translateY: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          translateX: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={cn('absolute z-[-1]', className)}
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-right"
          imgClassName="size-full object-left"
        />
      </motion.div>
    </div>
  )
}

const GlowMobile = ({
  backgroundImage,
  className,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
}) => {
  if (!backgroundImage) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -my-[42rem]">
      <motion.div
        initial={{
          opacity: 0,
          rotate: -90,
          bottom: '524px',
          left: '-370px',
          y: '0px',
          x: '0px',
          width: '1200px',
          height: '1200px',
        }}
        animate={{
          opacity: 1,
          rotate: -90,
          bottom: '524px',
          left: '-370px',
          y: '0px',
          x: '0px',
          width: '1200px',
          height: '1200px',
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
          opacity: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
          rotateY: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          translateY: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          translateX: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={cn('absolute z-[-1]', className)}
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-right"
          imgClassName="size-full object-left"
        />
      </motion.div>
    </div>
  )
}

export { GlowDesktop, GlowMobile }
