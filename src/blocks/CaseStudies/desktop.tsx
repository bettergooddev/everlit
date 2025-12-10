'use client'

import { useState, useRef, useEffect } from 'react'
import { Heading } from '@/components/Heading'
import type { CaseStudiesBlock, CaseStudy, Media as MediaType } from '@/payload-types'
import { Link } from '@/components/ui/link'
import { Frame } from '@/components/Frame'
import { motion, animate } from 'motion/react'
import { cn } from '@/utilities/ui'
import { springFadeUpStaggered } from './animations'
import { CaseStudiesBlockProps } from './Component'

export function CaseStudiesDesktop({
  heading,
  caseStudies,
  className,
  inView,
}: CaseStudiesBlockProps & { inView: boolean }) {
  const [activeStudy, setActiveStudy] = useState<number | null>(null)

  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <div className={cn(className)}>
      {heading && <Heading heading={heading} className="container z-10" />}

      <div
        className="grid grid-cols-[1fr,calc(var(--container-max-width)/5*2),calc(var(--container-max-width)/5*3),1fr]
      
        
        z-[1]"
      >
        {/* xl:grid-cols-[1fr,calc(var(--container-max-width)*0.5),calc(var(--container-max-width)*0.5),1fr]  */}
        <CaseStudyLinksWrapper
          caseStudies={caseStudies}
          activeStudy={activeStudy}
          setActiveStudy={setActiveStudy}
          inView={inView}
        />
        <div className="col-start-3 col-span-3 row-start-1 size-full relative pointer-events-none">
          {caseStudies.map(({ id, title, slug }, index) => (
            <motion.div
              key={id}
              className="absolute inset-0 grid grid-cols-[70%,30%] gap-8 lg:gap-16 xl:pl-8 pr-24 xl:pr-48  pt-32 xl:pt-24 will-change-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={index === activeStudy ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Frame
                resource={caseStudies[index]?.thumbnailBig || caseStudies[index]?.studyHero?.image}
                className="size-full -mt-[35%] flex aspect-[3/4] "
                imgClassName="size-full object-cover will-change-transform"
              />
              <motion.div
                className="will-change-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={index === activeStudy ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Frame
                  resource={caseStudies[index]?.thumbnailSmall || caseStudies[index]?.gallery?.[0]}
                  className="size-full h-1/2 mt-[65%] flex"
                  imgClassName="size-full object-cover will-change-transform"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CaseStudyLinksWrapperProps {
  caseStudies: CaseStudy[]
  activeStudy: number | null
  setActiveStudy: (index: number | null) => void
  inView: boolean
}

function CaseStudyLinksWrapper({
  caseStudies,
  activeStudy,
  setActiveStudy,
  inView,
}: CaseStudyLinksWrapperProps) {
  const linkWrapperRef = useRef<HTMLDivElement>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!linkWrapperRef.current || hasAnimatedRef.current) return

    const children = Array.from(linkWrapperRef.current.children)

    const timeout = setTimeout(() => {
      if (inView) {
        hasAnimatedRef.current = true
        animate(children, { opacity: 1, y: 0 }, springFadeUpStaggered)
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [inView])

  return (
    <div ref={linkWrapperRef} className="grid grid-cols-subgrid col-start-1 col-span-4 row-start-1">
      {caseStudies.map(({ id, title, slug }, index) => (
        <Link
          key={id}
          href={`/case-studies/${slug}`}
          className="py-8 bg-transparent outline outline-foreground-100/10 grid grid-cols-subgrid col-start-1 col-span-4 transition-colors duration-500 relative"
          style={{
            outlineWidth: '1px',
            outlineOffset: '-0.5px',
            opacity: 0,
            transform: 'translateY(40px)',
          }}
          onMouseEnter={() => setActiveStudy(index)}
          onMouseLeave={() => setActiveStudy(null)}
        >
          <div
            className={cn(
              'absolute inset-0 bg-background-100/25 shadow-inner -z-[1] duration-300',
              index === activeStudy ? 'opacity-100' : 'opacity-0',
            )}
          />

          <div className="col-start-2 pr-8">
            <div className="type-h3">{title}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
