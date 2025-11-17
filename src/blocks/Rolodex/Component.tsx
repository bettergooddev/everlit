'use client'

import { Button, useMediaQuery } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'
import { useRef } from 'react'
import { RxChevronRight } from 'react-icons/rx'
import * as motion from 'motion/react-client'
import { useScroll, useSpring, useTransform } from 'motion/react'
import type { Rolodex as RolodexBlockType } from '@/payload-types'
import Section from '@/components/Section'
import { Badge } from '@/components/ui/badge'

export const RolodexBlock: React.FC<RolodexBlockType> = ({ highlights }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 991px)')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const highlightCount = highlights.length
  const numbers = Array.from({ length: highlightCount }, (_, index) => index + 1)

  const yTablet = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    ['0%', '-25%', '-25%', '-50%', '-50%', '-75%'],
  )
  const yDesktop = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    ['0%', '0%', '-25%', '-35%', '-50%', '-75%'],
  )
  const y = isTablet ? yTablet : yDesktop

  return (
    <Section id="relume" ref={ref} className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="relative grid auto-cols-fr grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-[0.75fr_1fr] md:gap-y-16 lg:grid-cols-[max-content_1fr] lg:gap-x-20">
          <div className="static top-[20%] hidden h-56 overflow-hidden md:sticky md:flex md:items-start">
            <h1 className="text-[6rem] font-bold leading-[1] md:text-[14rem]">0</h1>
            <motion.div className="text-center" style={{ y }}>
              {numbers.map((number, index) => (
                <h1 key={index} className="text-[6rem] font-bold leading-[1] md:text-[14rem]">
                  {number}
                </h1>
              ))}
            </motion.div>
          </div>
          <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:gap-x-28 md:gap-y-28">
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
    <div className="flex flex-col items-start justify-center py-8 md:py-0">
      <div className="mt-10 flex text-[6rem] font-bold leading-[1] md:mt-0 md:hidden md:text-[14rem]">
        {displayNumber}
      </div>
      <div ref={ref} className="mb-8 mt-8 h-0.5 w-full bg-neutral-lighter md:mt-0">
        <motion.div className="h-0.5 w-8 bg-neutral-black" style={width} />
      </div>
      {/* <p className="mb-3 font-semibold md:mb-4">{highlight.tagline}</p> */}
      <h2 className="rb-5 mb-5 type-h2">{highlight.heading}</h2>
      {highlight.tags && highlight.tags.length > 0 && (
        <ul className="flex flex-row gap-2 flex-wrap mb-5">
          {highlight.tags.map(({ tag }, index) => (
            <li key={index}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      )}
      <p className="md:text-md">{highlight.description}</p>
    </div>
  )
}
