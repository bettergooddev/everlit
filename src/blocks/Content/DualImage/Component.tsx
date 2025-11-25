'use client'

import React, { useRef } from 'react'
import { useInView } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ContentBlock } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'
import { Frame } from '@/components/Frame'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import Section from '@/components/Section'
import { GlowDesktop, GlowMobile } from './glow'
import { usePageTransition } from '@/providers/PageTransition'
import { useBlurEntrance } from '@/hooks/useBlurEntrance'
import { extractPlainText } from '@/utilities/richtext'
import { useFadeUp } from '@/hooks/useFadeUp'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const DualImage: React.FC<ContentBlock> = ({
  heading,
  description,
  dualImage,
  reverseLayout,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const frame1Ref = useRef<HTMLDivElement>(null)
  const frame2Ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.45 })
  const { isTransitioning } = usePageTransition()

  // Call all hooks at the top level (before any conditional returns)
  // All animations triggered by sectionRef so they chain properly
  const headingRef = useBlurEntrance<HTMLDivElement>({
    text: heading ? extractPlainText(heading) : null,
    triggerRef: sectionRef,
    start: 'top 65%',
    stagger: 0.092,
    initialBlur: 12,
  })
  const descriptionRef = useFadeUp<HTMLParagraphElement>({
    triggerRef: sectionRef,
    start: 'top 65%',
    initialY: 20,
    delay: 0.345,
  })

  // GSAP animation for both frames - synced with other animations via sectionRef
  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Frame 1 (large image) - no delay
      if (frame1Ref.current) {
        gsap.set(frame1Ref.current, {
          opacity: 0,
          y: 100,
        })

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
          animation: gsap.to(frame1Ref.current, {
            opacity: 1,
            y: 0,
            duration: 1.265,
            delay: 0,
            ease: 'power2.out',
          }),
        })
      }

      // Frame 2 (smaller image) - delayed for sequential feel
      if (frame2Ref.current) {
        gsap.set(frame2Ref.current, {
          opacity: 0,
          y: 100,
        })

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
          animation: gsap.to(frame2Ref.current, {
            opacity: 1,
            y: 0,
            duration: 1.265,
            delay: 0.55,
            ease: 'power2.out',
          }),
        })
      }
    },
    { scope: sectionRef },
  )

  if (!dualImage?.images || dualImage.images.length === 0) return null

  const validImages = dualImage.images.filter(
    (image): image is string | MediaType => image !== null && image !== undefined,
  )

  if (validImages.length === 0) return null

  const image1 = validImages[0]
  const image2 = validImages[1]

  return (
    <Section ref={sectionRef} className="z-[1] relative">
      <GlowDesktop
        backgroundImage={dualImage?.backgroundImage}
        className="hidden lg:block"
        inView={isInView}
        isTransitioning={isTransitioning}
      />
      <GlowMobile
        backgroundImage={dualImage?.backgroundImage}
        className="lg:hidden"
        inView={isInView}
        isTransitioning={isTransitioning}
      />
      <div
        className={cn(
          'container flex gap-8 md:gap-16 flex-col',
          reverseLayout ? 'lg:flex-col' : 'lg:flex-col-reverse',
          reverseLayout ? 'lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        <div className="w-full lg:w-2/5 flex flex-col justify-between gap-8 md:gap-14 lg:gap-0">
          <div className="flex flex-col">
            {heading && (
              <div ref={headingRef} className="[&_*]:!type-h3 text-foreground-100">
                <RichText data={heading} enableProse={false} enableGutter={false} />
              </div>
            )}
            {description && (
              <p
                ref={descriptionRef}
                className="type-body mt-3 text-foreground-100 opacity-75 max-w-[48ch]"
              >
                {description}
              </p>
            )}
          </div>

          <div ref={frame2Ref} className="pr-16 lg:pr-0 aspect-[5/3] lg:aspect-square w-full">
            <Frame
              inner
              resource={image2}
              className="size-full relative"
              imgClassName="w-full h-full object-cover lg:absolute lg:inset-0 "
            />
          </div>
        </div>
        <div
          ref={frame1Ref}
          className="lg:w-3/5 aspect-[5/3] lg:aspect-square lg:mb-24 pl-16 lg:pl-0"
        >
          <Frame
            inner
            resource={image1}
            className="size-full "
            imgClassName="w-full h-full object-cover "
          />
        </div>
      </div>
    </Section>
  )
}
