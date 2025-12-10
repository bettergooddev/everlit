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
  const backgroundImageRef = useRef<HTMLDivElement>(null)

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

  // GSAP animation for the background image - fade in on scroll
  useGSAP(
    () => {
      if (!backgroundImageRef.current || !sectionRef.current) return

      gsap.set(backgroundImageRef.current, {
        opacity: 0,
      })

      const scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        once: true,
        animation: gsap.to(backgroundImageRef.current, {
          opacity: 1,
          duration: 0.85,
          delay: 0.7,
          ease: 'power2.out',
        }),
      })

      return () => {
        scrollTrigger?.kill()
      }
    },
    { scope: sectionRef },
  )

  if (!grid?.foregroundImage || !grid?.backgroundImage) return null

  const { foregroundImage, backgroundImage, bullets, tags } = grid

  const hasBullets = bullets && bullets.length > 0
  const hasTags = tags && tags.length > 0

  return (
    <Section
      ref={sectionRef}
      className="relative border-t-[1px] border-b-[1px] border-foreground-100/10"
    >
      <div
        className={cn(
          'container flex gap-8 md:gap-16 flex-col relative',
          reverseLayout ? ' lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        <div className="w-[1px] bg-foreground-100/10 absolute -top-8 -bottom-8 left-4 block lg:hidden" />
        <div className="w-[1px] bg-foreground-100/10 absolute -top-8 -bottom-8 right-4 block lg:hidden" />
        <div className="w-full lg:w-1/3 flex flex-col justify-between gap-14 lg:gap-0 relative">
          <div className="w-[1px] bg-foreground-100/10 absolute -top-8 -bottom-8 left-0 hidden lg:block" />

          <div className="h-[1px] bg-foreground-100/10 absolute -left-full -right-8 md:-right-16 bottom-16 hidden lg:block" />

          <div className="h-[1px] bg-foreground-100/10 absolute -bottom-8 left-0 right-0 block lg:hidden" />

          <div className="flex flex-col p-8">
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
        <div className="w-full lg:w-2/3 aspect-[5/3] relative">
          <div className="w-[1px] bg-foreground-100/10 absolute -top-8 -bottom-8 left-0 hidden lg:block" />
          <div className="w-[1px] bg-foreground-100/10 absolute -top-8 -bottom-8 right-0 hidden lg:block" />

          <div ref={backgroundImageRef} className="size-full z-[0]">
            <Media
              resource={backgroundImage}
              className="size-full z-[0]"
              imgClassName="w-full h-full object-cover"
            />
            <Media
              resource={backgroundImage}
              className="size-full z-[0]"
              imgClassName="w-full h-full object-cover absolute inset-0 opacity-65"
            />
          </div>
          <Media
            resource={foregroundImage}
            className="size-full absolute inset-0 z-[1]"
            imgClassName="w-full h-full object-cover"
          />
        </div>
      </div>
    </Section>
  )
}
