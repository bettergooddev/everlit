'use client'

import { useRef } from 'react'
import * as motion from 'motion/react-client'
import { useInView, useScroll, useSpring, useTransform } from 'motion/react'
import type { Rolodex as RolodexBlockType } from '@/payload-types'
import Section from '@/components/Section'
import { Badge } from '@/components/ui/badge'
import { GlowDesktop, GlowMobile } from './glow'

export const RolodexBlock: React.FC<RolodexBlockType> = ({ highlights, backgroundImage }) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const isInView = useInView(ref, { amount: 0.5 })

  const highlightCount = highlights.length
  const numbers = Array.from({ length: highlightCount }, (_, index) => index + 1)
  const y = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.65, 0.75],
    ['0%', '-33.5%', '-33.5%', '-66.5%'],
  )

  return (
    <Section id="relume" ref={ref} className="relative z-[1]">
      <GlowDesktop
        backgroundImage={backgroundImage}
        isInView={isInView}
        className="hidden lg:block"
      />
      <GlowMobile backgroundImage={backgroundImage} isInView={isInView} className="lg:hidden" />
      <div className="container">
        <div className="relative grid auto-cols-fr grid-cols-1 items-start gap-x-8 gap-y-12 lg:grid-cols-[0.75fr_1fr] lg:gap-y-16 xl:grid-cols-[2fr_3fr] xl:gap-x-32 justify-center">
          <div className="static top-[30%] hidden h-[6rem] lg:h-[10rem]  xl:h-[11rem] overflow-hidden lg:sticky lg:flex lg:items-start lg:justify-end">
            <h1 className="font-calvino text-[6rem] font-medium leading-[1] lg:text-[10rem] xl:text-[11rem]">
              0
            </h1>
            <motion.div className="text-center" style={{ y }}>
              {numbers.map((number, index) => (
                <h1
                  key={index}
                  className="font-calvino text-[6rem] font-medium leading-[1] lg:text-[10rem] xl:text-[11rem]"
                >
                  {number}
                </h1>
              ))}
            </motion.div>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 lg:gap-x-28 lg:gap-y-28">
            {highlights.map((highlight, index) => (
              <HighlightCard key={index} {...highlight} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

const HighlightCard = ({
  index,
  ...highlight
}: NonNullable<RolodexBlockType['highlights']>[number] & { index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const animatedWidth = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })
  const width = { width: useTransform(animatedWidth, [0, 1], ['0%', '100%']) }
  const displayNumber = String(index + 1).padStart(2, '0')

  return (
    <div className="flex flex-col items-start justify-center py-8 lg:py-0">
      <div className="mt-10 flex type-h1 lg:mt-0 lg:hidden">{displayNumber}</div>
      <div ref={ref} className="mb-8 mt-8 h-0.5 w-full bg-foreground-100/10 lg:mt-0 hidden">
        <motion.div className="h-0.5 w-8 bg-neutral-black" style={width} />
      </div>
      <h2 className="rb-5 mb-4 type-h2 lg:mb-5 ">{highlight.heading}</h2>
      {highlight.tags && highlight.tags.length > 0 && (
        <ul className="flex flex-row gap-2 flex-wrap mb-6">
          {highlight.tags.map(({ tag }, index) => (
            <li key={index}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      )}
      <p className="max-w-[48ch] lg:text-md">{highlight.description}</p>
    </div>
  )
}
