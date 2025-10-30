import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RenderFeatures } from '@/blocks/Features/RenderFeatures'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { FlairBlock } from '@/blocks/Flair/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import Section from '@/components/Section'

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  features: RenderFeatures,
  testimonials: TestimonialsBlock,
  timeline: TimelineBlock,
  flair: FlairBlock,
  gallery: GalleryBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <Section key={index}>
                  <Block {...block} disableInnerContainer />
                </Section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
