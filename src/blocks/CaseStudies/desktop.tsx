'use client'

import { useState } from 'react'
import { Heading } from '@/components/Heading'
import { Media } from '@/components/Media'
import type { CaseStudy, Media as MediaType } from '@/payload-types'
import Link from 'next/link'
import { Frame } from '@/components/Frame'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'

interface CaseStudiesDesktopProps {
  heading: string
  backgroundImage: string | MediaType
  caseStudies: CaseStudy[]
  className?: string
}

export function CaseStudiesDesktop({
  heading,
  backgroundImage,
  caseStudies,
  className,
  ...props
}: CaseStudiesDesktopProps) {
  const [activeStudy, setActiveStudy] = useState<number | null>(null)

  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className=" absolute inset-0 z-[-1] blur-xl"
        animate={{
          rotateY: [12, -12, 12],
          rotateX: [8, -8, 8],
          // rotateX: [10, -10, 10],
          translateY: [2, -2, 2],
          translateX: [5, -5, 5],
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
          imgClassName="absolute inset-0 object-left-top top-[-120%] left-[-25%] max-w-[unset] size-[2000px] object-contain rotate-[-20deg] scale-125"
        />
      </motion.div>

      <Heading heading={heading} className="container z-10" />

      <div className="grid grid-cols-[1fr,calc(var(--container-max-width)/2),calc(var(--container-max-width)/2),1fr] z-[1]">
        <div className="grid grid-cols-subgrid col-start-1 col-span-4 row-start-1">
          {caseStudies.map(({ id, title, slug }, index) => (
            <Link
              key={id}
              href={`/case-studies/${slug}`}
              className="py-8 bg-transparent outline outline-foreground-300/10 grid grid-cols-subgrid col-start-1 col-span-4 transition-colors duration-500 relative"
              style={{
                outlineWidth: '1px',
                outlineOffset: '-0.5px',
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
        <div className="col-start-3 col-span-3 row-start-1 size-full relative pointer-events-none">
          {caseStudies.map(({ id, title, slug }, index) => (
            <motion.div
              key={id}
              className="absolute inset-0 grid grid-cols-[70%,30%] gap-16 pl-0 p-32 will-change-transform"
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
                imgClassName="size-full object-cover "
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
                  imgClassName="size-full object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
