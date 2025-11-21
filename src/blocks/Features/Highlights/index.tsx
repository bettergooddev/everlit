'use client'

import React from 'react'
import type { FeaturesBlock } from '@/payload-types'
import { Heading } from '@/components/Heading'
import { Media } from '@/components/Media'
import { GlowingCards, GlowingCard } from '@/components/ui/glowing-cards'
import Section from '@/components/Section'

export const Highlights: React.FC<FeaturesBlock> = ({
  heading,
  subheading,
  actions,
  highlights,
}) => {
  const hasHighlights = highlights && highlights.length > 0
  return (
    <Section className="z-[1]">
      <div className="container">
        <Heading heading={heading} subheading={subheading} actions={actions} />

        {hasHighlights && (
          <GlowingCards className="mt-16">
            {highlights.map((highlight, index) => (
              <GlowingCard key={index} className="rounded-xs">
                <HighlightCardContent highlight={highlight} />
              </GlowingCard>
            ))}
          </GlowingCards>
        )}
      </div>
    </Section>
  )
}

type HighlightType = NonNullable<FeaturesBlock['highlights']>[number]

function HighlightCardContent({ highlight }: { highlight: HighlightType }) {
  return (
    <>
      <Media resource={highlight.image} className="size-24" imgClassName="size-full object-cover" />
      <h3 className="mt-12">{highlight.heading}</h3>
      {highlight.subheading && (
        <p className="type-body opacity-85 mt-2 max-w-[30ch] text-pretty">{highlight.subheading}</p>
      )}
    </>
  )
}
