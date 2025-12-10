'use client'

import React, { useRef } from 'react'
import { motion } from 'motion/react'

import type { Page } from '@/payload-types'
import Section from '@/components/Section'
import { Frame } from '@/components/Frame'
import RichText from '@/components/RichText'
import { useBlurEntrance } from '@/hooks/useBlurEntrance'
import { extractPlainText } from '@/utilities/richtext'

export const MainHero: React.FC<Page['hero']> = (props) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Blur entrance animations for text
  const headingRef = useBlurEntrance<HTMLHeadingElement>({
    text: props?.main?.headingRich ? extractPlainText(props.main.headingRich) : null,
    triggerRef: sectionRef,
    start: 'top 100%',
    stagger: 0.08,
    initialBlur: 12,
    delay: 0.6,
  })

  const descriptionRef = useBlurEntrance<HTMLHeadingElement>({
    text: props?.main?.description || null,
    triggerRef: sectionRef,
    start: 'top 100%',
    stagger: 0.08,
    initialBlur: 12,
    delay: 1,
  })

  if (!props?.main) return null

  const { headingRich, description, image } = props.main

  return (
    <Section ref={sectionRef} className="relative min-h-screen !mt-0 flex">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.77, 0, 0.175, 1],
          delay: 0,
        }}
        className="absolute inset-0 z-[0]"
      >
        <Frame
          resource={image}
          className="size-full object-cover"
          imgClassName="size-full object-cover object-[73%_45%] md:object-center"
        />
      </motion.div>

      <div className="absolute top-0 left-0 w-2/3 h-full z-[0] bg-gradient-to-r from-black/60 to-transparent opacity-100 " />

      <div className="container-full flex flex-col justify-end z-[1] relative p-6 md:p-24">
        <h1
          ref={headingRef}
          className="text-foreground-900 max-w-[5ch] [text-shadow:0_0_10px_rgba(255,255,255,0.5)] shadow-yellow-300 z-[1] relative [&_*]:!type-h1"
        >
          <RichText data={headingRich} enableGutter={false} enableProse={false} />
        </h1>

        <h3 ref={descriptionRef} className="text-foreground-500 max-w-[24ch] mt-8 z-[1] relative">
          {description}
        </h3>
      </div>
    </Section>
  )
}
