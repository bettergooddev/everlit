import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CTAForm/Component'
// import { ColumnsBlock } from '@/blocks/Columns/Component'
import { RenderContent } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
// import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RenderFeatures } from '@/blocks/Features/RenderFeatures'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { FlairBlock } from '@/blocks/Flair/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import { CaseStudiesBlock } from '@/blocks/CaseStudies/Component'
import { Tabs } from '@/blocks/Tabs/Component'
// import { Rolodex } from '@/blocks/Rolodex/Component'
import { Quote } from '@/blocks/Quote/Component'
import Section from '@/components/Section'

const blockComponents = {
  content: RenderContent,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  // mediaBlock: MediaBlock,
  features: RenderFeatures,
  testimonials: TestimonialsBlock,
  timeline: TimelineBlock,
  flair: FlairBlock,
  gallery: GalleryBlock,
  'case-studies': CaseStudiesBlock,
  tabs: Tabs,
  // rolodex: Rolodex,
  quote: Quote,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <div className="overflow-hidden flex flex-col">
        <Fragment>
          {blocks.map((block, index) => {
            const { blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType as keyof typeof blockComponents]

              if (Block) {
                return (
                  <Section key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block
                      {...block}
                      // TODO: bring this back when needed on blocks that go inside rich text like columns or media, i believe
                      //  disableInnerContainer
                    />
                  </Section>
                )
              }
            }
            return null
          })}
        </Fragment>
      </div>
    )
  }

  return null
}
