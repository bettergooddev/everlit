import React from 'react'
import type { ContentBlock } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { Frame } from '@/components/Frame'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const DualImage: React.FC<ContentBlock> = ({
  heading,
  description,
  dualImage,
  reverseLayout,
}) => {
  if (!dualImage?.images || dualImage.images.length === 0) return null

  const validImages = dualImage.images.filter(
    (image): image is string | MediaType => image !== null && image !== undefined,
  )

  if (validImages.length === 0) return null

  const image1 = validImages[0]
  const image2 = validImages[1]

  return (
    <div
      className={cn(
        'container flex gap-16 flex-col-reverse',
        reverseLayout ? 'lg:flex-row-reverse' : 'lg:flex-row',
      )}
    >
      <Frame
        inner
        resource={image1}
        className="w-full lg:w-2/3 aspect-[5/3] lg:aspect-square lg:mb-24 pl-16 lg:pl-0"
        imgClassName="w-full h-full object-cover "
      />

      <div className="w-full lg:w-1/3 flex flex-col justify-between gap-14 lg:gap-0">
        <div className="flex flex-col">
          {heading && (
            <div className="[&_*]:!type-h3 text-foreground-100">
              <RichText data={heading} enableProse={false} enableGutter={false} />
            </div>
          )}
          {description && (
            <p className="type-body mt-3 text-foreground-100 opacity-75 max-w-[48ch]">
              {description}
            </p>
          )}
        </div>

        <Frame
          inner
          resource={image2}
          className=" pr-16 lg:pr-0 w-full aspect-[5/3] lg:aspect-square relative"
          imgClassName="w-full h-full object-cover lg:absolute lg:inset-0 "
        />
      </div>
    </div>
  )
}
