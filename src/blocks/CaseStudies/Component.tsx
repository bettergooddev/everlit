import React from 'react'
import type { CaseStudiesBlock as CaseStudiesBlockType, CaseStudy, Media } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CaseStudiesClient } from './client'

export type CaseStudiesBlockProps = Omit<
  CaseStudiesBlockType,
  'caseStudies' | 'backgroundImage'
> & {
  caseStudies: CaseStudy[]
  backgroundImage: Media
  className?: string
}

export const CaseStudiesBlock: React.FC<CaseStudiesBlockType> = async (rawProps) => {
  const payload = await getPayload({ config: configPromise })

  const backgroundImage = rawProps.backgroundImage as Media

  let populatedCaseStudies: CaseStudy[] = []

  if (rawProps?.caseStudies && rawProps.caseStudies.length > 0) {
    const caseStudyIds = rawProps.caseStudies.map((caseStudy) =>
      typeof caseStudy === 'object' && caseStudy?.id ? caseStudy.id : caseStudy,
    )

    const caseStudiesResult = await payload.find({
      collection: 'case-studies',
      depth: 2,
      limit: caseStudyIds.length,
      pagination: false,
      overrideAccess: false,
      where: {
        id: {
          in: caseStudyIds.filter((id): id is string => typeof id === 'string'),
        },
      },
    })

    // Create a map for quick lookup
    const caseStudiesMap = new Map(caseStudiesResult.docs.map((doc) => [doc.id, doc]))

    // Preserve the original order by mapping over the original array
    populatedCaseStudies = rawProps.caseStudies
      .map((caseStudy) => {
        // Extract the ID whether it's a string or object
        const id = typeof caseStudy === 'object' && caseStudy?.id ? caseStudy.id : caseStudy
        // Always use the fetched data from the map (which has depth: 2 populated)
        if (typeof id === 'string') {
          return caseStudiesMap.get(id) || null
        }
        return null
      })
      .filter((caseStudy): caseStudy is CaseStudy => caseStudy !== null)
  }

  const props = { ...rawProps, caseStudies: populatedCaseStudies, backgroundImage }

  return <CaseStudiesClient {...props} />
}
