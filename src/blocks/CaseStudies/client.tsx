'use client'

import type { CaseStudiesBlock, CaseStudy, Media } from '@/payload-types'
import { CaseStudiesDesktop } from './desktop'
import { CaseStudiesMobile } from './mobile'
import { CaseStudiesBlockProps } from './Component'

export function CaseStudiesClient(props: CaseStudiesBlockProps) {
  if (!props.caseStudies || props.caseStudies.length === 0) return null

  return (
    <>
      <CaseStudiesMobile {...props} className="block md:hidden" />
      <CaseStudiesDesktop {...props} className="hidden md:block" />
    </>
  )
}
