'use client'

import React from 'react'
import { motion } from 'motion/react'
import { popInInView } from '@/utilities/animations'
import type { FeaturesBlock } from '@/payload-types'
import { Heading } from '@/components/Heading'
import { Frame } from '@/components/Frame'

export const Highlights: React.FC<FeaturesBlock> = ({ heading, subheading, highlights }) => {
  const hasHighlights = highlights && highlights.length > 0
  return (
    <div className="container">
      <Heading heading={heading} subheading={subheading} />

      {hasHighlights && (
        <div className="grid grid-cols-1 px-12 min-[54.4rem]:px-48 min-[68rem]:grid-cols-3 gap-16 min-[68rem]:px-24">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

type HighlightType = NonNullable<FeaturesBlock['highlights']>[number]

function HighlightCard({ highlight, index }: { highlight: HighlightType; index: number }) {
  return (
    <div className="flex flex-col items-center text-center theme-sugar-shack ">
      <motion.div
        className="mb-6 w-full aspect-square max-w-xs sm:max-w-none mx-auto"
        {...popInInView(index)}
      >
        <Frame resource={highlight.image} className="size-full rounded-lg" />
      </motion.div>
      <h3 className="type-h3 text-foreground mt-2">{highlight.heading}</h3>
      {highlight.subheading && (
        <p className="type-body text-foreground/65 mt-2">{highlight.subheading}</p>
      )}
    </div>
  )
}
