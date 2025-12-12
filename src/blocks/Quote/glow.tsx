'use client'

import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const Wrapper = ({
  children,
  inView,
  isTransitioning,
  className,
}: {
  children: React.ReactNode
  inView: boolean
  isTransitioning: boolean
  className?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{
        ease: [0.77, 0, 0.175, 1],
        duration: 3,
        delay: isTransitioning ? 1 : 0,
      }}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden -my-[28rem] -z-[1]',
        className,
      )}
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
    <Wrapper inView={inView} isTransitioning={isTransitioning} className={className}>
      {/* Top-right glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
          opacity: {
            duration: 1,
            delay: isTransitioning ? 1 + 0.5 * 0 : 0.5 * 0,
            ease: [0.77, 0, 0.175, 1],
          },
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
          rotate: 15,
          top: '-100px',
          right: '-35%',
          width: '1400px',
          height: '1400px',
          transformStyle: 'preserve-3d',
        }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>

      {/* Bottom-left glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
          opacity: {
            duration: 1,
            delay: isTransitioning ? 1 + 0.5 * 1 : 0.5 * 1,
            ease: [0.77, 0, 0.175, 1],
          },
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
          rotate: 195,
          bottom: '-100px',
          left: '-35%',
          width: '1400px',
          height: '1400px',
          transformStyle: 'preserve-3d',
        }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
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
    <Wrapper inView={inView} isTransitioning={isTransitioning} className={className}>
      {/* Top-right glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
          opacity: {
            duration: 1,
            delay: isTransitioning ? 1 + 0.3 * 0 : 0.3 * 0,
            ease: [0.77, 0, 0.175, 1],
          },
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
          rotate: 40,
          top: '100px',
          right: '-80%',
          width: '900px',
          height: '900px',
          transformStyle: 'preserve-3d',
        }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>

      {/* Bottom-left glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
          opacity: {
            duration: 1,
            delay: isTransitioning ? 1 + 0.3 * 1 : 0.3 * 1,
            ease: [0.77, 0, 0.175, 1],
          },
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
          rotate: 220,
          bottom: '100px',
          left: '-80%',
          width: '900px',
          height: '900px',
          transformStyle: 'preserve-3d',
        }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
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
    <Wrapper inView={inView} isTransitioning={isTransitioning} className={className}>
      {/* Top-right glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
          opacity: {
            duration: 1,
            delay: isTransitioning ? 1 + 0.3 * 0 : 0.3 * 0,
            ease: [0.77, 0, 0.175, 1],
          },
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
          rotate: 15,
          top: '-100px',
          right: '-30%',
          width: '1200px',
          height: '1200px',
          transformStyle: 'preserve-3d',
        }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>

      {/* Bottom-left glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotateY: [14, -14, 14],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
        }}
        transition={{
          opacity: {
            duration: 1,
            delay: isTransitioning ? 1 + 0.3 * 1 : 0.3 * 1,
            ease: [0.77, 0, 0.175, 1],
          },
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
          rotate: 195,
          bottom: '-100px',
          left: '-30%',
          width: '1200px',
          height: '1200px',
          transformStyle: 'preserve-3d',
        }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>
    </Wrapper>
  )
}

export { GlowDesktop, GlowMobile, GlowTablet }
