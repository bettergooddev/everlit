import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Frame } from '../../components/Frame'
import * as motion from 'motion/react-client'
import { fadeUpInView } from '@/utilities/animations'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16 px-0 lg:px-24">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { type, enableLink, link, richText, size, media } = col

            return (
              <div
                className={cn(
                  `flex flex-col justify-center theme-sugar-shack col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    'md:col-span-2': size !== 'full',
                  },
                )}
                key={index}
              >
                {type === 'content' && (
                  <>
                    {richText && (
                      <RichText
                        className="[&_h2]:!mb-4 [&_*]:text-foreground [&_p]:opacity-65 [&_p]:lg:max-w-[32ch] [&_br]:hidden [&_br]:lg:block"
                        data={richText}
                        enableGutter={false}
                      />
                    )}
                    {enableLink && (
                      <div data-theme="pizza" className="mt-6">
                        <CMSLink {...link} />
                      </div>
                    )}
                  </>
                )}

                {type === 'media' && media && (
                  <motion.div {...fadeUpInView(index)}>
                    <Frame
                      resource={media}
                      className="w-full overflow-hidden"
                      imgClassName="w-full h-auto scale-[1.025]"
                    />
                  </motion.div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
