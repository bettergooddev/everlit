'use client'

import React, { useRef } from 'react'
import { useInView, motion } from 'motion/react'
import type { ContentBlock } from '@/payload-types'
import { Frame } from '@/components/Frame'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import Section from '@/components/Section'

export const Standard: React.FC<ContentBlock> = ({
  heading,
  description,
  standard,
  reverseLayout,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  if (!standard?.image) return null

  const { image, bullets, tags } = standard

  const hasBullets = bullets && bullets.length > 0
  const hasTags = tags && tags.length > 0

  return (
    <Section ref={sectionRef} className="z-[1]">
      <div
        className={cn(
          'container flex gap-8 md:gap-16 flex-col',
          reverseLayout ? ' lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        <div className="w-full lg:w-1/3 flex flex-col justify-between gap-14 lg:gap-0">
          <div className="flex flex-col">
            {heading && (
              <div className="[&_*]:!type-h3 text-foreground-100">
                <RichText data={heading} enableProse={false} enableGutter={false} />
              </div>
            )}
            {hasTags && (
              <ul className="flex flex-row gap-2 flex-wrap mt-6 mb-2">
                {tags.map(({ tag }, index) => (
                  <li key={index}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
            {description && (
              <p className="type-body mt-4 text-foreground-100 opacity-75 max-w-[48ch]">
                {description}
              </p>
            )}

            {hasBullets && (
              <ul className="list-disc list-outside mt-8 mb-2 space-y-4 pl-6">
                {bullets.map(({ bullet }, index) => (
                  <li key={index} className="type-h4 text-foreground-100 pl-2">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{
            duration: 1,
            delay: 0.3 * 0,
            ease: [0.77, 0, 0.175, 1],
          }}
          className="w-full lg:w-2/3 aspect-[5/3]"
        >
          <Frame
            inner
            resource={image}
            className="size-full"
            imgClassName="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </Section>
  )
}
