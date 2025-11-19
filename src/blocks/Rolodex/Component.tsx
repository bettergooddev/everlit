'use client'

import { Button, useMediaQuery } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'
import { useRef } from 'react'
import { RxChevronRight } from 'react-icons/rx'
import * as motion from 'motion/react-client'
import { useInView, useScroll, useSpring, useTransform } from 'motion/react'
import type { Rolodex as RolodexBlockType } from '@/payload-types'
import Section from '@/components/Section'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'

export const RolodexBlock: React.FC<RolodexBlockType> = ({ highlights, backgroundImage }) => {
  const ref = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

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
      <motion.div
        ref={wrapperRef}
        className="absolute inset-0 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div
          animate={{
            rotateY: [12, -12, 12],
            translateY: [6, -6, 6],
            opacity: [100, 80, 100],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            transformStyle: 'preserve-3d',
            top: '50%',
            left: '60%',
            y: '-44%',
            x: '-53%',
            width: '2000px',
            height: '2000px',
          }}
          className="fixed z-[-1]"
        >
          <Media
            resource={backgroundImage}
            className="blur-xl object-left"
            imgClassName="size-full object-left"
          />
        </motion.div>
      </motion.div>
      <div className="container">
        <div className="relative grid auto-cols-fr grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-[0.75fr_1fr] md:gap-y-16 lg:grid-cols-[max-content_1fr] lg:gap-x-20">
          <div className="static top-[30%] hidden h-56 overflow-hidden md:sticky md:flex md:items-start">
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
      <h2 className="rb-5 mb-4 type-h2 md:mb-5 ">{highlight.heading}</h2>
      {highlight.tags && highlight.tags.length > 0 && (
        <ul className="flex flex-row gap-2 flex-wrap mb-6">
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
