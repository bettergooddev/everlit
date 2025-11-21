import React from 'react'

import type { Page } from '@/payload-types'
import { Frame } from '@/components/Frame'
import Section from '@/components/Section'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'

export const SubHero: React.FC<Page['hero']> = (props) => {
  if (!props?.sub) return null

  const { heading, description, image, backgroundImage } = props.sub

  return (
    <Section className="!mt-[unset] relative">
      <GlowDesktop backgroundImage={backgroundImage} className="hidden lg:block" />
      <GlowTablet backgroundImage={backgroundImage} className="hidden md:block lg:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="md:hidden" />
      <div className="container lg:grid lg:grid-cols-[3fr,2fr] pt-section-mobile pb-52 gap-16 flex flex-col">
        <Frame
          resource={image}
          className="size-full object-cover aspect-[4/3]"
          imgClassName="size-full object-cover"
        />

        <div className="h-full flex flex-col-reverse lg:flex-col justify-between gap-8 xl:gap-0">
          <p className="max-w-[48ch]">{description}</p>
          <h1 className="flex flex-col gap-4 text-foreground-900">{heading}</h1>
        </div>
      </div>
    </Section>
  )
}
