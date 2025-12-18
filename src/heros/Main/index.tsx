'use client'

import React, { forwardRef, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import type { Page } from '@/payload-types'
import Section from '@/components/Section'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { useBlurEntrance } from '@/hooks/useBlurEntrance'
import { useFadeUp } from '@/hooks/useFadeUp'
import { extractPlainText } from '@/utilities/richtext'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { cn } from '@/utilities/ui'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export const MainHero: React.FC<Page['hero']> = (props) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // GSAP animation for image entrance and parallax
  useGSAP(
    () => {
      if (!imageRef.current || !sectionRef.current) return

      // Set initial state to prevent flicker
      gsap.set(imageRef.current, {
        opacity: 0,
        y: 40,
      })

      // Entrance animation
      gsap.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.38,
        ease: 'power2.out',
        delay: 0.2,
      })

      // Parallax scroll effect
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'start start',
        end: 'end start',
        scrub: true,
        animation: gsap.to(imageRef.current, {
          y: '30%',
          ease: 'none',
        }),
      })
    },
    { scope: imageRef },
  )

  // Blur entrance animations for text
  const headingRef = useBlurEntrance<HTMLHeadingElement>({
    text: props?.main?.headingRich ? extractPlainText(props.main.headingRich) : null,
    triggerRef: sectionRef,
    start: 'top 100%',
    stagger: 0.1,
    initialBlur: 12,
    duration: 0.9,
    delay: 1.2,
  })

  const descriptionRef = useBlurEntrance<HTMLHeadingElement>({
    text: props?.main?.description || null,
    triggerRef: sectionRef,
    start: 'top 100%',
    stagger: 0.1,
    initialBlur: 12,
    duration: 0.9,
    delay: 1.85,
  })

  const scrollIndicatorRef = useFadeUp<HTMLDivElement>({
    triggerRef: sectionRef,
    start: 'top 100%',
    initialY: 20,
    duration: 0.8,
    delay: 2.5,
    ease: 'power2.out',
  })

  if (!props?.main) return null

  const { headingRich, description, image, mobileImage } = props.main

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let currentElement: HTMLElement | null = e.currentTarget

    // Find the nearest parent with a class containing "section"
    while (currentElement) {
      const classList = Array.from(currentElement.classList)
      const hasSectionClass = classList.some((cls) => cls.toLowerCase().includes('section'))

      if (hasSectionClass) {
        // Get the next sibling element
        const nextSibling = currentElement.nextElementSibling as HTMLElement | null

        if (nextSibling) {
          nextSibling.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        break
      }

      currentElement = currentElement.parentElement
    }
  }

  return (
    <Section
      ref={sectionRef}
      className="relative min-h-screen !mt-0 !mb-section-mobile flex overflow-hidden"
    >
      <div className="absolute h-[32rem] md:h-32 bg-gradient-to-t from-background-900 to-background-900/0 bottom-0 left-0 right-0 z-[1]" />
      <div ref={imageRef} className="absolute inset-0 z-[0]">
        {mobileImage && (
          <Media
            resource={mobileImage}
            className="size-full object-cover md:hidden"
            imgClassName="size-full object-cover object-[73%_45%]"
          />
        )}
        <Media
          resource={image}
          className={
            mobileImage ? 'hidden md:block size-full object-cover' : 'size-full object-cover'
          }
          imgClassName="size-full object-cover object-[73%_45%] md:object-center"
        />
      </div>

      <div className="absolute top-0 left-0 w-2/3 h-full z-[0] bg-gradient-to-r from-black/60 to-transparent opacity-100" />
      <div className="absolute top-0 left-0 w-2/3 h-full z-[0] bg-gradient-to-r from-black/60 to-transparent opacity-75" />

      <div className="lg:px-[2rem] container lg:!w-full lg:!max-w-full flex flex-row justify-between items-end">
        <div className=" flex flex-col justify-end z-[1] relative  !pb-24">
          <h1
            ref={headingRef}
            className="text-foreground-900 [text-shadow:0_0_10px_rgba(255,255,255,0.5)] shadow-yellow-300 z-[1] relative [&_*]:!type-h1"
          >
            <RichText data={headingRich} enableGutter={false} enableProse={false} />
          </h1>

          <h3
            ref={descriptionRef}
            className="text-foreground-500 mt-6  z-[1] relative max-w-[26ch]"
          >
            {description}
          </h3>
          {/* <ScrollIndicator
            ref={scrollIndicatorRef}
            onClick={handleClick}
            className="block lg:hidden -mb-[7rem] mt-0 -ml-[4.75rem]"
          /> */}
        </div>
        <ScrollIndicator
          ref={scrollIndicatorRef}
          onClick={handleClick}
          className="hidden lg:block"
        />
      </div>
    </Section>
  )
}

const ScrollIndicator = forwardRef<
  HTMLDivElement,
  { className?: string; onClick?: (e: React.MouseEvent<HTMLDivElement>) => void }
>(({ className, onClick }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn('relative group cursor-pointer', className)}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onClick={onClick}
    >
      <DotLottieReact
        src="https://lottie.host/54c3b337-f3f4-4414-8184-e51495f17bd3/tHWf3qGIWI.lottie"
        loop
        autoplay
        className="w-48 h-48 z-[1]"
      />
      <DotLottieReact
        src="https://lottie.host/54c3b337-f3f4-4414-8184-e51495f17bd3/tHWf3qGIWI.lottie"
        loop
        autoplay
        className="w-48 h-48 z-[0] absolute inset-0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  )
})

ScrollIndicator.displayName = 'ScrollIndicator'
