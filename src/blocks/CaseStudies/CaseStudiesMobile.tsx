'use client'

import type { CaseStudy, Media as MediaType } from '@/payload-types'
import Link from 'next/link'
import { Frame } from '@/components/Frame'
import { ArrowRight } from 'lucide-react'

interface CaseStudiesMobileProps {
  heading: string
  backgroundImage: string | MediaType
  caseStudies: CaseStudy[]
  className?: string
}

export function CaseStudiesMobile({ caseStudies, className, ...props }: CaseStudiesMobileProps) {
  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <div className={className}>
      <div className="container grid gap-8">
        {caseStudies.map(({ id, title, slug, studyHero }) => (
          <Link key={id} href={`/case-studies/${slug}`} className="group">
            <Frame
              resource={studyHero?.image}
              className="w-full aspect-[4/3] mb-4"
              imgClassName="w-full h-full object-cover"
            />
            <div className="flex items-center justify-between">
              <div className="type-h3">{title}</div>
              <ArrowRight className="shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

