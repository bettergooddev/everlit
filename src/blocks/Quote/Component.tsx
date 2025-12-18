'use client'

import React, { useRef } from 'react'
import { useInView } from 'motion/react'
import type { Quote as QuoteType } from '@/payload-types'
import Section from '@/components/Section'
import { GraphicDoubleQuote } from '@/paths/paths'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'
import { useTextReveal } from '@/hooks/useTextReveal'

export const Quote: React.FC<QuoteType> = ({ quote, backgroundImage }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const quoteRef = useTextReveal<HTMLQuoteElement>({
    text: quote,
    start: 'top 75%',
    end: 'top 30%',
  })

  return (
    <Section ref={sectionRef} className="relative">
      <GlowDesktop
        backgroundImage={backgroundImage}
        className="hidden xl:block"
        inView={isInView}
      />
      <GlowTablet
        backgroundImage={backgroundImage}
        className="hidden md:block xl:hidden"
        inView={isInView}
      />
      <GlowMobile backgroundImage={backgroundImage} className="lg:hidden" inView={isInView} />
      <div className="container text-center relative">
        <GraphicDoubleQuote className="size-16 sm:size-24 lg:size-32 absolute top-1/2 left-0 -translate-y-[calc(50%+8px)] opacity-5 " />
        <blockquote ref={quoteRef} className="type-h3 max-w-[42ch] mx-auto italic text-pretty">
          {quote}
        </blockquote>
      </div>
    </Section>
  )
}
