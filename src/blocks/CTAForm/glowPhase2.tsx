'use client'
import React from 'react'
import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface GlowPhase2Props {
  backgroundImage: string | MediaType | null | undefined
  formProgress: number
  className?: string
}

const GlowPhase2Desktop = ({ backgroundImage, formProgress, className }: GlowPhase2Props) => {
  if (!backgroundImage) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      className={cn('absolute inset-0 z-[-1]', className)}
    >
      <motion.div
        animate={{
          rotate: Math.min(Math.max(-65 + ((formProgress - 3) / 9) * 65, -65), 0),
          opacity: Math.min(Math.max(0.5 + ((formProgress - 3) / 9) * 0.5, 0.5), 1),
        }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 z-[-1]"
      >
        <motion.div
          animate={{
            rotate: 90,
            top: '50%',
            y: '-50%',
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
            y: '-50%',
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
    </motion.div>
  )
}

const GlowPhase2Mobile = ({ backgroundImage, formProgress, className }: GlowPhase2Props) => {
  if (!backgroundImage) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      className={cn('absolute inset-0 z-[-1]', className)}
    >
      <motion.div
        animate={{
          rotate: Math.min(Math.max(-65 + ((formProgress - 3) / 9) * 65, -65), 0),
          opacity: Math.min(Math.max(0.5 + ((formProgress - 3) / 9) * 0.5, 0.5), 1),
        }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 z-[-1]"
      >
        <motion.div
          animate={{
            rotate: 90,
            top: '50%',
            y: '-50%',
            x: '-2200px',
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
            y: '-50%',
            x: '2200px',
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
    </motion.div>
  )
}

export { GlowPhase2Desktop, GlowPhase2Mobile }
