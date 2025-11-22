'use client'

import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const Wrapper = ({
  children,
  inView,
  isTransitioning,
}: {
  children: React.ReactNode
  inView: boolean
  isTransitioning: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{
        ease: [0.77, 0, 0.175, 1],
        duration: 0.5,
        delay: isTransitioning ? 1 : 0,
      }}
      className="pointer-events-none absolute inset-0 overflow-hidden -my-[52rem] -z-[1]"
    >
      {children}
    </motion.div>
  )
}

const GlowDesktop = ({
  backgroundImage,
  className,
  inView,
  isTransitioning,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
  inView: boolean
  isTransitioning: boolean
}) => {
  if (!backgroundImage) return null

  return (
    <Wrapper inView={inView} isTransitioning={isTransitioning}>
      <motion.div
        initial={{
          rotate: 110,
          top: '400px',
          right: '-400px',
          y: '0px',
          x: '120px',
          width: '1900px',
          height: '1900px',
        }}
        animate={{
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
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
    </Wrapper>
  )
}

const GlowMobile = ({
  backgroundImage,
  className,
  inView,
  isTransitioning,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
  inView: boolean
  isTransitioning: boolean
}) => {
  if (!backgroundImage) return null

  return (
    <Wrapper inView={inView} isTransitioning={isTransitioning}>
      <motion.div
        initial={{
          rotate: 155,
          left: '-300px',
          bottom: '500px',
          y: '0px',
          x: '0px',
          width: '1200px',
          height: '1200px',
        }}
        animate={{
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
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
    </Wrapper>
  )
}

const GlowTablet = ({
  backgroundImage,
  className,
  inView,
  isTransitioning,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
  inView: boolean
  isTransitioning: boolean
}) => {
  if (!backgroundImage) return null

  return (
    <Wrapper inView={inView} isTransitioning={isTransitioning}>
      <motion.div
        initial={{
          rotate: 155,
          left: '-100px',
          bottom: '500px',
          y: '0px',
          x: '0px',
          width: '1200px',
          height: '1200px',
        }}
        animate={{
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
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
    </Wrapper>
  )
}

export { GlowDesktop, GlowMobile, GlowTablet }
