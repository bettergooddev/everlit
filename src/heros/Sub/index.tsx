'use client'

import React from 'react'
import { motion } from 'motion/react'

import type { Page } from '@/payload-types'
import { Frame } from '@/components/Frame'
import Section from '@/components/Section'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'

export const SubHero: React.FC<Page['hero']> = (props) => {
  if (!props?.sub) return null

  const { heading, description, image, backgroundImage } = props.sub

  return (
    <Section className="relative">
      <GlowDesktop backgroundImage={backgroundImage} className="hidden xl:block" />
      <GlowTablet backgroundImage={backgroundImage} className="hidden md:block xl:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="md:hidden" />
      <div className="container xl:grid xl:grid-cols-[3fr,2fr] gap-16 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.77, 0, 0.175, 1],
            delay: 0.5,
          }}
        >
          <Frame
            resource={image}
            className="size-full object-cover aspect-[4/3] lg:aspect-auto"
            imgClassName="size-full object-cover"
          />
        </motion.div>

        <div className="h-full flex flex-col-reverse xl:flex-col justify-between gap-8 xl:gap-0">
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 1.1,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="max-w-[48ch]"
          >
            {description}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 1,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="flex flex-col gap-4 text-foreground-900"
          >
            {heading}
          </motion.h1>
        </div>
      </div>
    </Section>
  )
}
