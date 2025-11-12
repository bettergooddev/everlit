'use client'

import { useState, useRef, useEffect } from 'react'
import { Heading } from '@/components/Heading'
import { Media } from '@/components/Media'
import type { CaseStudiesBlock, CaseStudy, Media as MediaType } from '@/payload-types'
import Link from 'next/link'
import { Frame } from '@/components/Frame'
import { motion, useInView, animate } from 'motion/react'
import { cn } from '@/utilities/ui'
import { springFadeUpStaggered } from './animations'
import { CaseStudiesBlockProps } from './Component'

export function CaseStudiesDesktop({
  heading,
  caseStudies,
  backgroundImage,
  className,
}: CaseStudiesBlockProps) {
  const [activeStudy, setActiveStudy] = useState<number | null>(null)

  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <div className={cn('relative', className)}>
      <BackgroundGlow backgroundImage={backgroundImage} />

      {heading && <Heading heading={heading} className="container z-10" />}

      <div
        className="grid grid-cols-[1fr,calc(var(--container-max-width)/5*2),calc(var(--container-max-width)/5*3),1fr]
      
      xl:grid-cols-[1fr,calc(var(--container-max-width)*0.5),calc(var(--container-max-width)*0.5),1fr] z-[1]"
      >
        <CaseStudyLinksWrapper
          caseStudies={caseStudies}
          activeStudy={activeStudy}
          setActiveStudy={setActiveStudy}
        />
        <div className="col-start-3 col-span-3 row-start-1 size-full relative pointer-events-none">
          {caseStudies.map(({ id, title, slug }, index) => (
            <motion.div
              key={id}
              className="absolute inset-0 grid grid-cols-[70%,30%] gap-8 lg:gap-16 pl-0 pr-32 xl:pr-64 pt-32 xl:pt-24 will-change-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={index === activeStudy ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Frame
                resource={caseStudies[index]?.studyHero?.image}
                className="size-full -mt-[35%] flex aspect-[3/4] "
                imgClassName="size-full object-cover will-change-transform"
              />
              <motion.div
                className="will-change-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={index === activeStudy ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Frame
                  resource={caseStudies[index]?.gallery[0]}
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
}

function CaseStudyLinksWrapper({
  caseStudies,
  activeStudy,
  setActiveStudy,
}: CaseStudyLinksWrapperProps) {
  const linkWrapperRef = useRef<HTMLDivElement>(null)
  const linkWrapperIsInView = useInView(linkWrapperRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (!linkWrapperRef.current) return

    const children = Array.from(linkWrapperRef.current.children)

    if (linkWrapperIsInView) {
      animate(children, { opacity: 1, y: 0 }, springFadeUpStaggered)
    } else {
      animate(children, { opacity: 0, y: 40 }, springFadeUpStaggered)
    }
  }, [linkWrapperIsInView])

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
            <div className="type-h4 xl:type-h3">{title}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

function BackgroundGlow({ backgroundImage }: { backgroundImage: MediaType }) {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const backgroundIsInView = useInView(backgroundRef, { once: false, amount: 0.4 })

  return (
    <motion.div
      ref={backgroundRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: backgroundIsInView ? 1 : 0 }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <motion.div
        className=" absolute inset-0 z-[-1] blur-xl"
        animate={{
          rotateY: [14, -14, 14],
          //   rotateX: [8, -8, 8],
          scaleY: [1.05, 1, 1.05],
          // rotateX: [10, -10, 10],
          //   translateY: [4, -4, 4],
          //   translateX: [7, -7, 7],
          opacity: [100, 80, 100],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <Media
          resource={backgroundImage}
          className=""
          imgClassName="absolute inset-0 object-left-top left-[-30rem] top-[-55rem] xl:left-[-20rem] max-w-[unset] size-[2000px] object-contain rotate-[-20deg] scale-125"
        />
      </motion.div>
    </motion.div>
  )
}
