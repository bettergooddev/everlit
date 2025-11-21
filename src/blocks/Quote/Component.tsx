import React from 'react'
import type { Quote as QuoteType } from '@/payload-types'
import Section from '@/components/Section'
import { GraphicDoubleQuote } from '@/paths/paths'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'

export const Quote: React.FC<QuoteType> = ({ quote, backgroundImage }) => {
  return (
    <Section className="relative">
      <GlowDesktop backgroundImage={backgroundImage} className="hidden xl:block" />
      <GlowTablet backgroundImage={backgroundImage} className="hidden md:block xl:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="lg:hidden" />
      <div className="container text-center relative">
        <GraphicDoubleQuote className="size-32 absolute top-1/2 left-0 -translate-y-[calc(50%+8px)] opacity-5 " />
        <blockquote className="type-h3 max-w-[22ch] mx-auto italic ">{quote}</blockquote>
      </div>
    </Section>
  )
}
