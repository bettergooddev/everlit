'use client'

import type { CaseStudiesBlock, CaseStudy, Media } from '@/payload-types'
import { CaseStudiesDesktop } from './desktop'
import { CaseStudiesMobile } from './mobile'
import { CaseStudiesBlockProps } from './Component'
import Section from '@/components/Section'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'

export function CaseStudiesClient(props: CaseStudiesBlockProps) {
  if (!props.caseStudies || props.caseStudies.length === 0) return null

  return (
    <div className="z-[1] relative">
      <div className="absolute inset-0" id="case-studies" />
      <Section className="relative">
        <GlowDesktop backgroundImage={props.backgroundImage} className="hidden lg:block" />
        <GlowTablet backgroundImage={props.backgroundImage} className="hidden md:block lg:hidden" />
        <GlowMobile backgroundImage={props.backgroundImage} className="md:hidden" />
        <CaseStudiesMobile {...props} className="block lg:hidden" />
        <CaseStudiesDesktop {...props} className="hidden lg:block" />
      </Section>
    </div>
  )
}
