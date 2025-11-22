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
        duration: 0.6,
        delay: isTransitioning ? 1 : 0.7,
      }}
      className="pointer-events-none absolute inset-0 overflow-hidden -my-[28rem] -z-[1]"
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
          rotate: 0,
          left: '-700px',
          top: '-800px',
          y: '0%',
          x: '0px',
          width: '3000px',
          height: '3000px',
        }}
        animate={{
          rotate: 0,
          left: '-700px',
          top: '-800px',
          y: '0%',
          x: '0px',
          width: '3000px',
          height: '3000px',
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
          rotate: 180,
          right: '-700px',
          top: '75%',
          y: '0%',
          x: '120px',
          width: '3000px',
          height: '300px',
        }}
        animate={{
          rotate: 180,
          right: '-700px',
          top: '2500px',
          y: '0%',
          x: '120px',
          width: '3000px',
          height: '300px',
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
          rotate: 180,
          left: '-250%',
          top: '05%',
          y: '0%',
          x: '120px',
          width: '4000px',
          height: '4000px',
        }}
        animate={{
          rotate: 180,
          left: '-250%',
          top: '05%',
          y: '0%',
          x: '120px',
          width: '4000px',
          height: '4000px',
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
