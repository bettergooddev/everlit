import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CTAForm/Component'
import { RenderContent } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
// import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { RenderFeatures } from '@/blocks/Features/RenderFeatures'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import { CaseStudiesBlock } from '@/blocks/CaseStudies/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'
import { RolodexBlock } from '@/blocks/Rolodex/Component'
import { Quote } from '@/blocks/Quote/Component'

const blockComponents = {
  content: RenderContent,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  // mediaBlock: MediaBlock,
  features: RenderFeatures,
  testimonials: TestimonialsBlock,
  gallery: GalleryBlock,
  'case-studies': CaseStudiesBlock,
  tabs: TabsBlock,
  rolodex: RolodexBlock,
  quote: Quote,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <div className="flex flex-col">
        <Fragment>
          {blocks.map((block, index) => {
            const { blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType as keyof typeof blockComponents]

              if (Block) {
                return (
                  <React.Fragment key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block
                      {...block}
                      // TODO: bring this back when needed on blocks that go inside rich text like media, i believe
                      //  disableInnerContainer
                    />
                  </React.Fragment>
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
