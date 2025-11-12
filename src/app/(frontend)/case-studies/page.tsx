import type { Metadata } from 'next/types'

// import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import PageClient from './page.client'
import { CaseStudiesBlock } from '@/blocks/CaseStudies/Component'
import { CaseStudy, Media } from '@/payload-types'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const page = await queryPageBySlug({ slug: 'case-studies' })

  const backgroundImage = await payload.find({
    collection: 'media',
    where: {
      id: {
        equals: '69135116854935e5aa5fbfdc',
      },
    },
  })

  const caseStudies = await payload.find({
    collection: 'case-studies',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  const { hero, layout } = page || {}

  return (
    <div className="pt-24 pb-24">
      <PageClient />

      {hero && <RenderHero {...hero} />}

      <CaseStudiesBlock
        blockType="case-studies"
        backgroundImage={backgroundImage.docs[0] as Media}
        caseStudies={caseStudies.docs as CaseStudy[]}
      />

      {layout && <RenderBlocks blocks={layout} />}
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({ slug: 'case-studies' })

  if (page) {
    return generateMeta({ doc: page })
  }

  return {
    title: `Payload Website Template Case Studies`,
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 3,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
