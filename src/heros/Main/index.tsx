'use client'

import React, { forwardRef, useRef } from 'react'
import { motion } from 'motion/react'

import type { Page } from '@/payload-types'
import Section from '@/components/Section'
import { Media } from '@/components/Media'
import { Frame } from '@/components/Frame'
import RichText from '@/components/RichText'
import { useBlurEntrance } from '@/hooks/useBlurEntrance'
import { useFadeUp } from '@/hooks/useFadeUp'
import { extractPlainText } from '@/utilities/richtext'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { cn } from '@/utilities/ui'

export const MainHero: React.FC<Page['hero']> = (props) => {
  const sectionRef = useRef<HTMLDivElement>(null)

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
    <Section ref={sectionRef} className="relative min-h-screen !mt-0 flex overflow-hidden">
      <div className="absolute h-[32rem] md:h-32 bg-gradient-to-t from-background-900 to-background-900/0 bottom-0 left-0 right-0 z-[1]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.38,
          ease: [0.77, 0, 0.175, 1],
          delay: 0.2,
        }}
        className="absolute inset-0 z-[0]"
      >
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
      </motion.div>
      <div className="absolute top-0 left-0 w-2/3 h-full z-[0] bg-gradient-to-r from-black/60 to-transparent opacity-100" />
      <div className="container-full flex flex-row justify-between w-full items-end">
        <div className=" flex flex-col justify-end z-[1] relative p-6 md:p-24">
          <h1
            ref={headingRef}
            className="text-foreground-900 max-w-[5ch] [text-shadow:0_0_10px_rgba(255,255,255,0.5)] shadow-yellow-300 z-[1] relative [&_*]:!type-h1"
          >
            <RichText data={headingRich} enableGutter={false} enableProse={false} />
          </h1>

          <h3
            ref={descriptionRef}
            className="text-foreground-500 max-w-[24ch] mt-6 md:mt-10 z-[1] relative"
          >
            {description}
          </h3>

          <ScrollIndicator
            ref={scrollIndicatorRef}
            onClick={handleClick}
            className="block lg:hidden -mb-8 mt-6 -ml-[4.75rem]"
          />
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
