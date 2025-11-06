import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { IconList } from '@/components/IconList'
import { Heading } from '@/components/Heading'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Media } from '@/components/Media'
import Map from '@/components/Map'
import { MaskBackground } from '@/components/MaskBackground'
import { cn } from '@/utilities/ui'
import { tv } from 'tailwind-variants'

const classes = {
  text: tv({
    variants: {
      style: {
        fancy: '[&_*]:!text-background',
        default: 'theme-sugar-shack text-foreground [&_*]:!text-foreground',
      },
    },
  }),
}

export const CallToActionBlock: React.FC<CTABlockProps> = async ({
  style,
  heading,
  subheading,
  links,
}) => {
  const payload = await getPayload({ config: configPromise })

  const contentGrid = (
    <>
      <Media className="lg:min-h-0" />
      <div className="flex flex-col gap-14">
        <div className={cn('flex flex-col gap-4', classes.text({ style }))}></div>
      </div>
    </>
  )

  return (
    <div className="">
      <div className="container">
        <Heading heading={heading} subheading={subheading} actions={links || []} />
      </div>

      {style === 'fancy' ? (
        <MaskBackground
          shape="paper"
          innerClassName="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] container gap-14 py-20"
        >
          {contentGrid}
        </MaskBackground>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] container gap-14 pt-8">
          {contentGrid}
        </div>
      )}
    </div>
  )
}
