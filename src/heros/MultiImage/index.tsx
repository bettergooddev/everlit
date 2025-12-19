'use client'

import { Frame } from '@/components/Frame'
import RichText from '@/components/RichText'
import { Page } from '@/payload-types'
import { Button, useMediaQuery } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'
import {
  motion,
  MotionStyle,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useCallback, useRef } from 'react'
import type { Media } from '@/payload-types'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'
import { useBlurEntrance } from '@/hooks/useBlurEntrance'
import { useFadeUp } from '@/hooks/useFadeUp'
import { extractPlainText } from '@/utilities/richtext'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'

type TransformStyles = {
  transform?: string
  x?: MotionValue<string>
  y?: MotionValue<string>
  style?: MotionStyle
}

const imagePositions = {
  group1: [
    'bottom-[20%] left-[-8%] z-10 max-w-[22%] sm:bottom-[10%] lg:bottom-auto',
    'left-[30%] top-[18%] z-10 max-w-[22%] sm:top-[10%] sm:max-w-[12%] lg:left-[40%] lg:top-[5%]',
    'bottom-[10%] right-[-5%] z-10 max-w-[30%] lg:max-w-[18%]',
    'bottom-[15%] left-[20%] z-10 max-w-[22%] sm:bottom-[-5%] sm:max-w-[16%] lg:bottom-[-10%]',
  ],
  group2: [
    'left-[2%] top-[5%] max-w-[35%] sm:left-[5%] sm:max-w-[18%] lg:left-[10%] lg:top-[-10%]',
    'right-[20%] top-[8%] max-w-[30%] sm:top-[5%] sm:max-w-[16%] lg:right-[20%] lg:top-[-10%]',
    'right-[-5%] top-[18%] max-w-[25%] sm:max-w-[15%] lg:top-[25%]',
    'bottom-[20%] right-[32%] max-w-[22%] sm:right-[30%] sm:max-w-[15%] lg:bottom-[5%] lg:max-w-[12%]',
  ],
}
const useMouseMove = () => {
  const mouseX = useMotionValue(0.55)
  const mouseY = useMotionValue(0.55)

  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 500 })
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 500 })

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = event
      const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
      const x = (clientX - left) / width
      const y = (clientY - top) / height
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY],
  )

  return { smoothMouseX, smoothMouseY, handleMouseMove }
}
export const MultiImageHero: React.FC<Page['hero']> = (props) => {
  const sectionRef = useRef<HTMLElement>(null)
  const { smoothMouseX, smoothMouseY, handleMouseMove } = useMouseMove()
  const isMobile = useMediaQuery('(max-width: 991px)')
  const Animate = isMobile ? 'div' : motion.div

  // Blur entrance animations for text - must be called unconditionally
  const headingRef = useBlurEntrance<HTMLDivElement>({
    text: props?.multiImage?.heading ? extractPlainText(props.multiImage.heading) : null,
    triggerRef: sectionRef,
    start: 'top 100%',
    stagger: 0.2,
    initialBlur: 12,
    duration: 1.5,
    delay: 0.8,
  })

  const descriptionRef = useBlurEntrance<HTMLParagraphElement>({
    text: props?.multiImage?.description || null,
    triggerRef: sectionRef,
    start: 'top 100%',
    stagger: 0.2,
    initialBlur: 12,
    duration: 1.5,
    delay: 2.0,
  })

  const scrollIndicatorRef = useFadeUp<HTMLDivElement>({
    triggerRef: sectionRef,
    start: 'top 100%',
    initialY: 20,
    duration: 1.6,
    delay: 4.25,
    ease: 'power2.out',
  })

  // Transform styles - hooks must be called at component level
  const canvasTransformX = useTransform(smoothMouseX, [0, 1], ['10vw', '-5vw'])
  const canvasTransformY = useTransform(smoothMouseY, [0, 1], ['10vh', '-5vh'])
  const canvasTransform: TransformStyles = {
    x: canvasTransformX,
    y: canvasTransformY,
  }

  const group1TransformX = useTransform(smoothMouseX, [0, 1], ['8%', '-8%'])
  const group1TransformY = useTransform(smoothMouseY, [0, 1], ['8%', '-8%'])
  const group1Transform: TransformStyles = {
    x: group1TransformX,
    y: group1TransformY,
  }

  const group2TransformX = useTransform(smoothMouseX, [0, 1], ['2%', '-2%'])
  const group2TransformY = useTransform(smoothMouseY, [0, 1], ['2%', '-2%'])
  const group2Transform: TransformStyles = {
    x: group2TransformX,
    y: group2TransformY,
  }

  const renderImages = (
    images: (string | Media)[],
    positions: string[],
    transformStyles: TransformStyles,
  ) => (
    <Animate
      className="absolute inset-0 flex origin-bottom items-center justify-center"
      style={transformStyles}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1.6,
            delay: 0.3 + index * 0.15,
            ease: [0.77, 0, 0.175, 1],
          }}
          className={`absolute w-full ${positions[index]}`}
        >
          <Frame
            resource={image}
            className="size-full aspect-[1/1]"
            imgClassName="size-full object-cover"
          />
        </motion.div>
      ))}
    </Animate>
  )

  if (!props?.multiImage) return null
  const { heading, description, images, backgroundImage } = props.multiImage

  const group1Images = images.slice(0, images.length / 2)
  const group2Images = images.slice(images.length / 2)

  return (
    <section
      ref={sectionRef}
      id="relume"
      className="relative flex h-svh items-center justify-center overflow-hidden lg:h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* <GlowDesktop backgroundImage={backgroundImage} className="hidden xl:block" />
      <GlowTablet backgroundImage={backgroundImage} className="hidden md:block xl:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="md:hidden" />

      <GlowDesktop backgroundImage={backgroundImage} className="hidden xl:block" />
      <GlowTablet backgroundImage={backgroundImage} className="hidden md:block xl:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="md:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="md:hidden" /> */}

      <div className="absolute h-[16rem] lg:h-[32rem] md:h-32 bg-gradient-to-t from-background-900 to-background-900/0 bottom-0 left-0 right-0 z-[1]" />
      <div className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="relative z-10 text-center justify-center">
            <div
              ref={headingRef}
              className=" [&_*]:!type-h1 [&_*]:text-foreground-500 md:mb-6 [text-shadow:0_0_10px_rgba(255,255,255,0.5)]"
            >
              <RichText data={heading} enableProse={false} enableGutter={false} />
            </div>

            <p ref={descriptionRef} className="type-body mt-1 text-foreground-500">
              {description}
            </p>

            <ScrollIndicator
              ref={scrollIndicatorRef}
              className=" justify-center -mb-24 md:mt-8 hidden md:flex"
            />

            {/* <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div> */}
          </div>
        </div>
      </div>
      <Animate className="absolute size-full" style={canvasTransform}>
        {renderImages(group1Images, imagePositions.group1, group1Transform)}
        {renderImages(group2Images, imagePositions.group2, group2Transform)}
      </Animate>
    </section>
  )
}
