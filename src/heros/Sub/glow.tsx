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
    <div className="pointer-events-none absolute inset-0 overflow-hidden -my-[28rem]">
      <motion.div
        initial={{
          opacity: 0,
          rotate: 0,
          right: '-250px',
          top: '300px',
          y: '0px',
          x: '0px',
          width: '1100px',
          height: '1100px',
        }}
        animate={{
          opacity: 1,
          rotate: 0,
          right: '-250px',
          top: '300px',
          y: '0px',
          x: '0px',
          width: '1100px',
          height: '1100px',
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden -my-[28rem]">
      <motion.div
        initial={{
          opacity: 0,
          rotate: 0,
          right: '-280px',
          top: '600px',
          y: '0px',
          x: '0px',
          width: '900px',
          height: '900px',
        }}
        animate={{
          opacity: 1,
          rotate: 0,
          right: '-280px',
          top: '600px',
          y: '0px',
          x: '0px',
          width: '900px',
          height: '900px',
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

const GlowTablet = ({
  backgroundImage,
  className,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
}) => {
  if (!backgroundImage) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -my-[28rem]">
      <motion.div
        initial={{
          opacity: 0,
          rotate: 0,
          right: '-250px',
          bottom: '0px',
          y: '0px',
          x: '0px',
          width: '1100px',
          height: '1100px',
        }}
        animate={{
          opacity: 1,
          rotate: 0,
          right: '-250px',
          bottom: '0px',
          y: '0px',
          x: '0px',
          width: '1100px',
          height: '1100px',
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

export { GlowDesktop, GlowMobile, GlowTablet }
