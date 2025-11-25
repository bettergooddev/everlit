'use client'

import React, { useRef } from 'react'
import { useInView, motion } from 'motion/react'
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

export const DualImage: React.FC<ContentBlock> = ({
  heading,
  description,
  dualImage,
  reverseLayout,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })
  const { isTransitioning } = usePageTransition()

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
              <div
                ref={useBlurEntrance<HTMLDivElement>({
                  text: extractPlainText(heading),
                  stagger: 0.08,
                  initialBlur: 12,
                })}
                className="[&_*]:!type-h3 text-foreground-100"
              >
                <RichText data={heading} enableProse={false} enableGutter={false} />
              </div>
            )}
            {description && (
              <p
                ref={useFadeUp<HTMLParagraphElement>({
                  initialY: 20,
                  delay: 0.3,
                })}
                className="type-body mt-3 text-foreground-100 opacity-75 max-w-[48ch]"
              >
                {description}
              </p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{
              duration: 1,
              delay: 0.3 * 1,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="pr-16 lg:pr-0 aspect-[5/3] lg:aspect-square w-full"
          >
            <Frame
              inner
              resource={image2}
              className="size-full relative"
              imgClassName="w-full h-full object-cover lg:absolute lg:inset-0 "
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{
            duration: 1,
            delay: 0.3 * 0,
            ease: [0.77, 0, 0.175, 1],
          }}
          className="lg:w-3/5 aspect-[5/3] lg:aspect-square lg:mb-24 pl-16 lg:pl-0"
        >
          <Frame
            inner
            resource={image1}
            className="size-full "
            imgClassName="w-full h-full object-cover "
          />
        </motion.div>
      </div>
    </Section>
  )
}
