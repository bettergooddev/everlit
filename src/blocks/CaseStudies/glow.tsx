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
        animate={{
          opacity: 1,
          rotate: 0,
          left: '-700px',
          top: '-800px',
          y: '0%',
          x: '0px',
          width: '3000px',
          height: '3000px',
          // rotateY: [14, -14, 14],
          // translateY: [2, -2, 2],
          // translateX: [5, -5, 5],
        }}
        // transition={{
        //   opacity: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
        //   rotateY: {
        //     duration: 4,
        //     repeat: Infinity,
        //     ease: 'easeInOut',
        //   },
        //   translateY: {
        //     duration: 4,
        //     repeat: Infinity,
        //     ease: 'easeInOut',
        //   },
        //   translateX: {
        //     duration: 4,
        //     repeat: Infinity,
        //     ease: 'easeInOut',
        //   },
        // }}
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
        animate={{
          opacity: 1,
          rotate: 180,
          left: '-350%',
          top: '75%',
          y: '0%',
          x: '120px',
          width: '3000px',
          height: '300px',
          // rotateY: [14, -14, 14],
          // translateY: [2, -2, 2],
          // translateX: [5, -5, 5],
        }}
        // transition={{
        //   opacity: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
        //   rotateY: {
        //     duration: 4,
        //     repeat: Infinity,
        //     ease: 'easeInOut',
        //   },
        //   translateY: {
        //     duration: 4,
        //     repeat: Infinity,
        //     ease: 'easeInOut',
        //   },
        //   translateX: {
        //     duration: 4,
        //     repeat: Infinity,
        //     ease: 'easeInOut',
        //   },
        // }}
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
        animate={{
          opacity: 1,
          rotate: 180,
          left: '-250%',
          top: '05%',
          y: '0%',
          x: '120px',
          width: '4000px',
          height: '4000px',
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
