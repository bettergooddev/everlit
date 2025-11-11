'use client'

import { useEffect, useState } from 'react'
import { Heading } from '@/components/Heading'
import { Media } from '@/components/Media'
import type { CaseStudiesBlock, CaseStudy } from '@/payload-types'
import Link from 'next/link'
import { Frame } from '@/components/Frame'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'

type CaseStudiesBlockType = Omit<CaseStudiesBlock, 'caseStudies'> & {
  caseStudies: CaseStudy[]
}

export function CaseStudiesClient({ heading, backgroundImage, caseStudies }: CaseStudiesBlockType) {
  const [activeStudy, setActiveStudy] = useState<number | null>(null)

  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <>
      <div className="relative">
        {/* <motion.div
          animate={{
            rotateY: [12, -12, 12],
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
        > */}
        <Media
          resource={backgroundImage}
          className=""
          imgClassName="z-[-1] absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[unset] size-[2000px] object-contain"
        />
        {/* </motion.div> */}

        <Heading heading={heading} className="container z-10" />

        <div className="grid grid-cols-[1fr,calc(var(--container-max-width)/2),calc(var(--container-max-width)/2),1fr] z-[1]">
          <div className="grid grid-cols-subgrid col-start-1 col-span-4 row-start-1">
            {caseStudies.map(({ id, title, slug }, index) => (
              <Link
                key={id}
                href={`/case-studies/${slug}`}
                className="py-8 bg-transparent hover:bg-background-100/25 outline outline-foreground-300 grid grid-cols-subgrid col-start-1 col-span-4 shadow-inner transition-colors"
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
            {caseStudies.map(({ id, title, slug }, index) => (
              <motion.div
                key={id}
                className="absolute inset-0 grid grid-cols-[70%,30%] gap-16 p-32"
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
    </>
  )
}
