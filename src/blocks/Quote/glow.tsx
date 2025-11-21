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
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden -my-[28rem]', className)}
    >
      {/* Top-right glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotate: 15,
          top: '-100px',
          right: '-10%',
          width: '1200px',
          height: '1200px',
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
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
          rotate: 195,
          bottom: '-100px',
          left: '-10%',
          width: '1200px',
          height: '1200px',
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
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
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden -my-[28rem]', className)}
    >
      {/* Top-right glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotate: 15,
          top: '200px',
          right: '-35%  ',
          width: '600px',
          height: '600px',
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
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
          rotate: 195,
          bottom: '200px',
          left: '-35%',
          width: '600px',
          height: '600px',
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
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
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden -my-[28rem]', className)}
    >
      {/* Top-right glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotate: 15,
          top: '-100px',
          right: '-30%',
          width: '1200px',
          height: '1200px',
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
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
          rotate: 195,
          bottom: '-100px',
          left: '-30%',
          width: '1200px',
          height: '1200px',
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        className="absolute z-[-1]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>
    </div>
  )
}

export { GlowDesktop, GlowMobile, GlowTablet }
