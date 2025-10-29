'use client'

import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Frame } from '@/components/Frame'
import { tv } from 'tailwind-variants'
import { cn } from '@/utilities/ui'
import { motion } from 'motion/react'
import { fadeUpInView } from '@/utilities/animations'

const classes = {
  wrapper: tv({
    variants: {
      hasLogo: {
        true: 'pt-6',
        false: 'pt-16',
      },
    },
  }),
}

export const MediumImpactHero: React.FC<Page['hero']> = (props) => {
  if (!props?.mediumImpact?.[0]) return null

  const { logo, heading, subheading, Buttons, image, theme = 'cafe' } = props.mediumImpact[0]

  const primary = Buttons?.primaryButton?.[0]?.link
  const secondary = Buttons?.secondaryButton?.[0]?.link
  const tertiary = Buttons?.tertiaryButton?.[0]?.link

  return (
    <div
      className={cn(
        'w-full -mb-8 flex flex-col items-center text-center px-4',
        classes.wrapper({ hasLogo: !!logo }),
      )}
      data-theme={theme}
    >
      {logo && (
        <Media
          resource={logo}
          className="w-[12rem] md:w-[18rem] h-auto"
          imgClassName="h-full w-full"
        />
      )}
      {heading && <h1 className="text-primary mt-0 type-h1">{heading}</h1>}
      {subheading && (
        <p className="opacity-75 text-primary mt-4 max-w-[60ch] mx-auto">{subheading}</p>
      )}
      {(primary || secondary || tertiary) && (
        <div className="flex flex-col items-center gap-4 justify-center mt-8">
          {(primary || secondary) && (
            <div className="flex flex-row gap-5">
              {secondary && <CMSLink {...secondary} appearance="secondary" />}
              {primary && <CMSLink {...primary} appearance="default" />}
            </div>
          )}
          {tertiary && (
            <CMSLink {...tertiary} appearance="link" className="opacity-75 hover:opacity-100" />
          )}
        </div>
      )}
      {image && (
        <motion.div {...fadeUpInView(0)} className="w-full flex justify-center">
          <Media resource={image} className="max-w-screen-xl flex mt-7 w-full rotate-[1deg]" />
        </motion.div>
      )}
    </div>
  )
}
