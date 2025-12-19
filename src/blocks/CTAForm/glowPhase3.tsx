'use client'
import React from 'react'
import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface GlowPhase3Props {
  backgroundImage: string | MediaType | null | undefined
}

export function GlowPhase3({ backgroundImage }: GlowPhase3Props) {
  if (!backgroundImage) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      className="absolute inset-0 z-[-1]"
    >
      <motion.div
        animate={{
          rotate: 180,
          top: '-20%',
          left: '50%',
          y: '-40%',
          x: '-53%',
          width: '3800px',
          height: '3800px',
        }}
        className="absolute left-0 z-[0]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>
      <motion.div
        animate={{
          rotate: 0,
          top: '50%',
          left: '50%',
          y: '-40%',
          x: '-53%',
          width: '3800px',
          height: '3800px',
        }}
        className="absolute left-0 z-[0]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>
      <motion.div
        animate={{
          rotate: 90,
          top: '50%',
          y: '-70%',
          x: '-2000px',
          width: '3800px',
          height: '3800px',
        }}
        className="absolute left-0 z-[0]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-left"
          imgClassName="size-full object-left"
        />
      </motion.div>
      <motion.div
        animate={{
          rotate: -90,
          right: 0,
          top: '50%',
          y: '-70%',
          x: '2000px',
          width: '3800px',
          height: '3800px',
        }}
        className="absolute z-[0]"
      >
        <Media
          resource={backgroundImage}
          className="blur-xl object-right"
          imgClassName="size-full object-left"
        />
      </motion.div>
    </motion.div>
  )
}

