import type { Metadata } from 'next'

import { RelatedCaseStudies } from '@/blocks/RelatedCaseStudies/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { CaseStudy } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { StudyHero } from '@/heros/Study'
import { GalleryBlock } from '@/blocks/Gallery/Component'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const caseStudies = await payload.find({
    collection: 'case-studies',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = caseStudies.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function CaseStudyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/case-studies/' + slug
  const caseStudy = await queryCaseStudyBySlug({ slug })

  if (!caseStudy) return <PayloadRedirects url={url} />

  const { previousCaseStudy, nextCaseStudy } = await getPreviousNextCaseStudies({
    currentSlug: slug,
    draft,
  })

  return (
    <article className="">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {caseStudy.studyHero && <StudyHero type="study" study={caseStudy.studyHero} />}

      <GalleryBlock blockType="gallery" images={caseStudy.gallery} />

      <RelatedCaseStudies
        currentSlug={slug}
        previousCaseStudy={previousCaseStudy}
        nextCaseStudy={nextCaseStudy}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const caseStudy = await queryCaseStudyBySlug({ slug })

  return generateMeta({ doc: caseStudy })
}

const queryCaseStudyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'case-studies',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const getPreviousNextCaseStudies = cache(
  async ({ currentSlug, draft }: { currentSlug: string; draft: boolean }) => {
    const payload = await getPayload({ config: configPromise })

    // Fetch all case studies ordered by createdAt (or publishedAt) to determine order
    const allCaseStudies = await payload.find({
      collection: 'case-studies',
      draft,
      limit: 1000,
      overrideAccess: draft,
      pagination: false,
      sort: '-createdAt', // Most recent first, or use '-publishedAt' if preferred
      select: {
        id: true,
        slug: true,
        title: true,
        studyHero: {
          image: true,
        },
      },
    })

    const currentIndex = allCaseStudies.docs.findIndex((study) => study.slug === currentSlug)

    if (currentIndex === -1 || allCaseStudies.docs.length <= 1) {
      return {
        previousCaseStudy: null,
        nextCaseStudy: null,
      }
    }

    // Loop around: if at first, previous is last; if at last, next is first
    const previousIndex = currentIndex === 0 ? allCaseStudies.docs.length - 1 : currentIndex - 1
    const nextIndex = currentIndex === allCaseStudies.docs.length - 1 ? 0 : currentIndex + 1

    const previousCaseStudy = allCaseStudies.docs[previousIndex]
    const nextCaseStudy = allCaseStudies.docs[nextIndex]

    // Fetch full data for previous and next case studies if they exist
    let previousFull: CaseStudy | null = null
    let nextFull: CaseStudy | null = null

    if (previousCaseStudy) {
      const prevResult = await payload.findByID({
        collection: 'case-studies',
        id: previousCaseStudy.id,
        draft,
        depth: 2,
        overrideAccess: draft,
      })
      previousFull = prevResult as CaseStudy
    }

    if (nextCaseStudy) {
      const nextResult = await payload.findByID({
        collection: 'case-studies',
        id: nextCaseStudy.id,
        draft,
        depth: 2,
        overrideAccess: draft,
      })
      nextFull = nextResult as CaseStudy
    }

    return {
      previousCaseStudy: previousFull,
      nextCaseStudy: nextFull,
    }
  },
)
