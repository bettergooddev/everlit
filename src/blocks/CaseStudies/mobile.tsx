'use client'

import type { CaseStudy, Media as MediaType } from '@/payload-types'
import Link from 'next/link'
import { Frame } from '@/components/Frame'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Media } from '@/components/Media'
import { Heading } from '@/components/Heading'
import { cn } from '@/utilities/ui'

interface CaseStudiesMobileProps {
  heading?: string | null
  backgroundImage: string | MediaType
  caseStudies: CaseStudy[]
  className?: string
}

export function CaseStudiesMobile({
  heading,
  caseStudies,
  backgroundImage,
  className,
  ...props
}: CaseStudiesMobileProps) {
  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <div className={cn(className, 'relative')}>
      <div className="absolute inset-0 z-[-1] overflow-hidden max-w-[100vw] ">
        <motion.div
          className="absolute inset-0 z-[-1] blur-xl "
          animate={{
            rotateY: [14, -14, 14],
            rotateX: [8, -8, 8],
            // rotateX: [10, -10, 10],
            translateY: [4, -4, 4],
            translateX: [7, -7, 7],
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
            imgClassName="absolute inset-0 object-right-top translate-x-[-1000px] max-w-[unset] size-[2000px] object-contain rotate-[200deg] scale-125"
          />
        </motion.div>
      </div>
      {heading && <Heading heading={heading} className="container z-10" />}

      <div className="container grid gap-16">
        {caseStudies.map(({ id, title, slug, studyHero }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: index * 0.1,
            }}
          >
            <Link href={`/case-studies/${slug}`} className="group">
              <Frame
                resource={studyHero?.image}
                className="w-full aspect-[5/3] transition-colors duration-300 mb-4 hover:border-[#616f74] "
                imgClassName="w-full h-full object-cover"
              />
              <div className="flex items-center justify-between">
                <div className="type-h4">{title}</div>
                <ArrowRight className="shrink-0 [&_*]:stroke-foreground-100" strokeWidth={0.75} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
