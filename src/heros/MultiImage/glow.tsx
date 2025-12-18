'use client'

import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 0.8, y: 0 }}
      transition={{
        ease: [0.77, 0, 0.175, 1],
        duration: 4,
        delay: 0.2,
      }}
      className="pointer-events-none absolute inset-0 overflow-hidden -my-[28rem] -z-[1] blur-3xl"
    >
      {children}
    </motion.div>
  )
}

const GlowDesktop = ({
  backgroundImage,
  className,
}: {
  backgroundImage: string | MediaType | null | undefined
  className?: string
}) => {
  if (!backgroundImage) return null

  return (
    <Wrapper>
      <motion.div
        initial={{
          rotate: 0,
          left: '50%',
          top: '57%',
          x: '-50%',
          y: '-43%',
          width: '3299px',
          height: '3299px',
        }}
        animate={{
          rotate: 0,
          left: '50%',
          top: '57%',
          x: '-50%',
          y: '-43%',
          width: '3299px',
          height: '3299px',
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
          className="blur-xl object-center"
          imgClassName="size-full object-center"
        />
      </motion.div>
    </Wrapper>
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
    <Wrapper>
      <motion.div
        initial={{
          rotate: 0,
          left: '50%',
          top: '57%',
          x: '-50%',
          y: '-43%',
          width: '2473px',
          height: '2473px',
        }}
        animate={{
          rotate: 0,
          left: '50%',
          top: '57%',
          x: '-50%',
          y: '-43%',
          width: '2473px',
          height: '2473px',
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
          className="blur-xl object-center"
          imgClassName="size-full object-center"
        />
      </motion.div>
    </Wrapper>
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
    <Wrapper>
      <motion.div
        initial={{
          rotate: 0,
          left: '50%',
          top: '57%',
          x: '-50%',
          y: '-43%',
          width: '3024px',
          height: '3024px',
        }}
        animate={{
          rotate: 0,
          left: '50%',
          top: '57%',
          x: '-50%',
          y: '-43%',
          width: '3024px',
          height: '3024px',
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
          className="blur-xl object-center"
          imgClassName="size-full object-center"
        />
      </motion.div>
    </Wrapper>
  )
}

export { GlowDesktop, GlowMobile, GlowTablet }
