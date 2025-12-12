'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'
import type { CaseStudiesBlock, CaseStudy, Media } from '@/payload-types'
import { CaseStudiesDesktop } from './desktop'
import { CaseStudiesMobile } from './mobile'
import { CaseStudiesBlockProps } from './Component'
import Section from '@/components/Section'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'
import { usePageTransition } from '@/providers/PageTransition'

export function CaseStudiesClient(props: CaseStudiesBlockProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })
  const { isTransitioning } = usePageTransition()

  if (!props.caseStudies || props.caseStudies.length === 0) return null

  return (
    <div className="z-[1] relative">
      <div className="absolute inset-0" id="case-studies" />
      <Section ref={sectionRef} className="relative">
        <GlowDesktop
          backgroundImage={props.backgroundImage}
          className="hidden lg:block"
          inView={isInView}
          isTransitioning={isTransitioning}
        />
        <GlowTablet
          backgroundImage={props.backgroundImage}
          className="hidden md:block lg:hidden"
          inView={isInView}
          isTransitioning={isTransitioning}
        />
        <GlowMobile
          backgroundImage={props.backgroundImage}
          className="md:hidden"
          inView={isInView}
          isTransitioning={isTransitioning}
        />
        <CaseStudiesMobile {...props} className="block lg:hidden" />
        <CaseStudiesDesktop {...props} className="hidden lg:block" inView={isInView} />
      </Section>
    </div>
  )
}
