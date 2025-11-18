'use client'

import type { CaseStudiesBlock, CaseStudy, Media } from '@/payload-types'
import { CaseStudiesDesktop } from './desktop'
import { CaseStudiesMobile } from './mobile'
import { CaseStudiesBlockProps } from './Component'
import Section from '@/components/Section'

export function CaseStudiesClient(props: CaseStudiesBlockProps) {
  if (!props.caseStudies || props.caseStudies.length === 0) return null

  return (
    <div className="-my-[28rem] overflow-hidden">
      <Section className="!my-[28rem] md:py-48 py-36">
        <CaseStudiesMobile {...props} className="block md:hidden" />
        <CaseStudiesDesktop {...props} className="hidden md:block" />
      </Section>
    </div>
  )
}
