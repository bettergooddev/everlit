'use client'

import type { CaseStudiesBlock, CaseStudy } from '@/payload-types'
import { CaseStudiesDesktop } from './desktop'
import { CaseStudiesMobile } from './CaseStudiesMobile'

type CaseStudiesBlockType = Omit<CaseStudiesBlock, 'caseStudies'> & {
  caseStudies: CaseStudy[]
}

export function CaseStudiesClient(props: CaseStudiesBlockType) {
  if (!props.caseStudies || props.caseStudies.length === 0) return null

  return (
    <>
      <CaseStudiesMobile {...props} className="block md:hidden" />
      <CaseStudiesDesktop {...props} className="hidden md:block" />
    </>
  )
}
