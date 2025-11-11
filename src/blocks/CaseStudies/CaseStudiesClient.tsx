'use client'

import { useEffect, useState } from 'react'
import { Heading } from '@/components/Heading'
import { Media } from '@/components/Media'
import type { CaseStudiesBlock, CaseStudy } from '@/payload-types'
import Link from 'next/link'
import { Frame } from '@/components/Frame'

type CaseStudiesBlockType = Omit<CaseStudiesBlock, 'caseStudies'> & {
  caseStudies: CaseStudy[]
}

export function CaseStudiesClient({ heading, caseStudies }: CaseStudiesBlockType) {
  const [activeStudy, setActiveStudy] = useState<number | null>(null)
  const hasActiveStudy = typeof activeStudy === 'number'

  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <>
      <div className="">
        <Heading heading={heading} className="container" />

        <div className="grid grid-cols-[1fr,calc(var(--container-max-width)/2),calc(var(--container-max-width)/2),1fr]">
          <div className="grid grid-cols-subgrid col-start-1 col-span-4 row-start-1">
            {caseStudies.map(({ id, title, slug }, index) => (
              <Link
                key={id}
                href={`/case-studies/${slug}`}
                className="py-8 bg-blue-500/50 outline outline-foreground-300 grid grid-cols-subgrid col-start-1 col-span-4"
                style={{
                  outlineWidth: '1px',
                  outlineOffset: '-0.5px',
                }}
                onMouseEnter={() => setActiveStudy(index)}
                onMouseLeave={() => setActiveStudy(null)}
              >
                <div className="col-start-2 pr-8">
                  <div className="type-h3">{title}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="col-start-3 col-span-3 row-start-1 size-full relative pointer-events-none">
            {hasActiveStudy && (
              <div className="absolute inset-0 grid grid-cols-[2fr,1fr] gap-16 p-16">
                <Frame
                  resource={caseStudies[activeStudy]?.studyHero?.image}
                  className="size-full -mt-[25%] flex"
                  imgClassName="size-full object-cover"
                  style={{
                    marginTop: `${-25 + activeStudy * 15}%`,
                  }}
                />
                <Frame
                  resource={caseStudies[activeStudy]?.gallery[0]}
                  className="size-full  h-1/2 mt-auto flex"
                  imgClassName="size-full object-cover"
                  style={{
                    marginBottom: `${-25 + activeStudy * 25}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
