'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ContentBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import Section from '@/components/Section'
import { Media } from '@/components/Media'
import { GridBackground } from '@/components/GridBackground'
import { useBlurEntrance } from '@/hooks/useBlurEntrance'
import { extractPlainText } from '@/utilities/richtext'
import { useFadeUp } from '@/hooks/useFadeUp'
import { useFadeUpStagger } from '@/hooks/useFadeUpStagger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const Grid: React.FC<ContentBlock> = ({ heading, description, grid, reverseLayout }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  // Call all hooks at the top level (before any conditional returns)
  // All animations triggered by sectionRef so they chain properly
  const headingRef = useBlurEntrance<HTMLDivElement>({
    text: heading ? extractPlainText(heading) : null,
    triggerRef: sectionRef,
    start: 'top 65%',
    stagger: 0.092,
    initialBlur: 12,
  })
  const tagsRef = useFadeUpStagger<HTMLUListElement>({
    triggerRef: sectionRef,
    start: 'top 65%',
    initialY: 15,
    delay: 0.345,
    stagger: 0.092,
  })
  const descriptionRef = useFadeUp<HTMLParagraphElement>({
    triggerRef: sectionRef,
    start: 'top 65%',
    initialY: 20,
    delay: 0.46,
  })
  const bulletsRef = useFadeUpStagger<HTMLUListElement>({
    triggerRef: sectionRef,
    start: 'top 65%',
    initialY: 20,
    delay: 0.805,
    stagger: 0.115,
  })

  // GSAP animation for the frame - synced with other animations via sectionRef
  useGSAP(
    () => {
      if (!frameRef.current || !sectionRef.current) return

      gsap.set(frameRef.current, {
        opacity: 0,
        y: 100,
      })

      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        once: true,
        animation: gsap.to(frameRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.265,
          delay: 0,
          ease: 'power2.out',
        }),
      })

      return () => {
        scrollTrigger?.kill()
      }
    },
    { scope: sectionRef },
  )

  if (!grid?.image) return null

  const { image, bullets, tags } = grid

  const hasBullets = bullets && bullets.length > 0
  const hasTags = tags && tags.length > 0

  return (
    <Section ref={sectionRef} className="relative">
      <div className="-z-[1] absolute inset-0 -my-32">
        <GridBackground className="-z-[1] absolute inset-0 -translate-y-1/2 top-1/2 " />
      </div>

      <div
        className={cn(
          'container flex gap-8 md:gap-16 flex-col',
          reverseLayout ? ' lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        <div className="w-full lg:w-1/3 flex flex-col justify-between gap-14 lg:gap-0">
          <div className="flex flex-col">
            {heading && (
              <div ref={headingRef} className="[&_*]:!type-h3 text-foreground-100">
                <RichText data={heading} enableProse={false} enableGutter={false} />
              </div>
            )}
            {hasTags && (
              <ul ref={tagsRef} className="flex flex-row gap-2 flex-wrap mt-6 mb-2">
                {tags.map(({ tag }, index: number) => (
                  <li key={index}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
            {description && (
              <p
                ref={descriptionRef}
                className="type-body mt-4 text-foreground-100 opacity-75 max-w-[48ch]"
              >
                {description}
              </p>
            )}

            {hasBullets && (
              <ul ref={bulletsRef} className="list-disc list-outside mt-8 mb-2 space-y-4 pl-6">
                {bullets.map(({ bullet }, index: number) => (
                  <li key={index} className="type-h4 text-foreground-100 pl-2">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div ref={frameRef} className="w-full lg:w-2/3 aspect-[5/3]">
          <Media
            resource={image}
            className="size-full bg-background frame"
            imgClassName="w-full h-full object-cover"
          />
        </div>
      </div>
    </Section>
  )
}
