import React from 'react'
import { Link } from '@/components/ui/link'
import { ChevronRight } from 'lucide-react'
import { Frame } from '@/components/Frame'
import { cn } from '@/utilities/ui'
import { extractPlainText } from '@/utilities/richtext'
import type { CaseStudy } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'

export type RelatedCaseStudiesProps = {
  currentSlug: string
  previousCaseStudy: CaseStudy | null
  nextCaseStudy: CaseStudy | null
  className?: string
}

export const RelatedCaseStudies: React.FC<RelatedCaseStudiesProps> = ({
  currentSlug,
  previousCaseStudy,
  nextCaseStudy,
  className,
}) => {
  if (!previousCaseStudy && !nextCaseStudy) {
    return null
  }

  return (
    <div className={cn('container py-section-mobile md:py-section', className)}>
      <div className="flex items-center justify-between mb-12">
        <h2 className="type-h2 text-foreground-100">Related Projects</h2>
        <Link href="/case-studies">
          <Button variant="secondary">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {previousCaseStudy ? <StudyCard study={previousCaseStudy} /> : <div />}
        {nextCaseStudy ? <StudyCard study={nextCaseStudy} /> : <div />}
      </div>
    </div>
  )
}

function StudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="group flex flex-col gap-4">
      <div className="relative w-full aspect-[5/3] overflow-hidden">
        <Media
          resource={study.studyHero?.image}
          className="w-full h-full frame overflow-hidden group-hover:border-foreground-100/20 transition-colors"
          imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row w-full justify-between items-center">
          <h3 className="type-h4 text-foreground-100">{study.title}</h3>

          {study.studyHero?.type && <Badge className="capitalize">{study.studyHero.type}</Badge>}
        </div>
        {(study.meta?.description || study.studyHero?.description) && (
          <p className="type-body text-foreground-100/60 line-clamp-2">
            {study.meta?.description || extractPlainText(study.studyHero?.description)}
          </p>
        )}
        <div className="flex items-center gap-1 text-foreground-100 group-hover:gap-2 transition-all duration-300 mt-1">
          <span className="type-body">View project</span>
          <ChevronRight className="size-4" strokeWidth={0.75} />
        </div>
      </div>
    </Link>
  )
}
