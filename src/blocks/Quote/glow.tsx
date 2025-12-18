'use client'

import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const Wrapper = ({
  children,
  inView,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  inView: boolean
  className?: string
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{
        ease: [0.33, 1, 0.68, 1],
        duration: 4,
        delay,
      }}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden -my-[34rem] -z-[1]',
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
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
  inView: boolean
}) => {
  if (!backgroundImage) return null

  return (
    <>
      <Wrapper inView={inView} className={className}>
        {/* Top-right glow */}
        <motion.div
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
            rotate: 15,
            top: '-4px',
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
      </Wrapper>

      {/* Bottom-left glow */}
      <Wrapper inView={inView} delay={0.75} className={className}>
        <motion.div
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
            rotate: 195,
            bottom: '-4px',
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
    </>
  )
}

const GlowMobile = ({
  backgroundImage,
  className,
  inView,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
  inView: boolean
}) => {
  if (!backgroundImage) return null

  return (
    <>
      <Wrapper inView={inView} className={className}>
        {/* Top-right glow */}
        <motion.div
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
            rotate: 40,
            top: '196px',
            right: '-120%',
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

      {/* Bottom-left glow */}
      <Wrapper inView={inView} delay={0.75} className={className}>
        <motion.div
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
            rotate: 220,
            bottom: '196px',
            left: '-120%',
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
    </>
  )
}

const GlowTablet = ({
  backgroundImage,
  className,
  inView,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
  inView: boolean
}) => {
  if (!backgroundImage) return null

  return (
    <>
      <Wrapper inView={inView} className={className}>
        {/* Top-right glow */}
        <motion.div
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
            rotate: 15,
            top: '-4px',
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
      </Wrapper>

      {/* Bottom-left glow */}
      <Wrapper inView={inView} delay={0.75} className={className}>
        <motion.div
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
            rotate: 195,
            bottom: '-4px',
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
    </>
  )
}

export { GlowDesktop, GlowMobile, GlowTablet }
