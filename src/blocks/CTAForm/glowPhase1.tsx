'use client'
import React from 'react'
import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface GlowPhase1Props {
  backgroundImage: string | MediaType | null | undefined
  formProgress: number
  lightRef: React.RefObject<HTMLDivElement | null>
}

export function GlowPhase1({ backgroundImage, formProgress, lightRef }: GlowPhase1Props) {
  if (!backgroundImage) return null

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 z-[-1]"
    >
      <div ref={lightRef} className="absolute inset-0">
        <motion.div
          animate={{
            opacity: Math.min(Math.max(0.5 + (formProgress / 4) * 0.5, 0.5), 1),
            rotate: 0,
            top: '50%',
            left: '50%',
            y: '-44%',
            x: '-53%',
            width: '3000px',
            height: '3000px',
            rotateY: [14, -14, 14],
            translateY: [2, -2, 2],
            translateX: [5, -5, 5],
          }}
          transition={{
            opacity: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
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
          className="absolute left-0 z-[0]"
        >
          <Media
            resource={backgroundImage}
            className="blur-xl object-left"
            imgClassName="size-full object-left"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
