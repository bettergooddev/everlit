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
import { extractPlainText } from '@/utilities/richtext'

type TransformStyles = {
  transform?: string
  x?: MotionValue<string>
  y?: MotionValue<string>
  style?: MotionStyle
}

const imagePositions = {
  group1: [
    'bottom-[20%] left-[-8%] z-10 max-w-[18%] sm:bottom-[10%] lg:bottom-auto',
    'left-[30%] top-[18%] z-10 max-w-[18%] sm:top-[10%] sm:max-w-[12%] lg:left-[40%] lg:top-[5%]',
    'bottom-[10%] right-[-5%] z-10 max-w-[25%] lg:max-w-[18%]',
    'bottom-[15%] left-[20%] z-10 max-w-[18%] sm:bottom-[-5%] sm:max-w-[16%] lg:bottom-[-10%]',
  ],
  group2: [
    'left-[2%] top-[5%] max-w-[30%] sm:left-[5%] sm:max-w-[18%] lg:left-[10%] lg:top-[-10%]',
    'right-[20%] top-[8%] max-w-[25%] sm:top-[5%] sm:max-w-[16%] lg:right-[20%] lg:top-[-10%]',
    'right-[-5%] top-[18%] max-w-[20%] sm:max-w-[15%] lg:top-[25%]',
    'bottom-[20%] right-[32%] max-w-[18%] sm:right-[30%] sm:max-w-[15%] lg:bottom-[5%] lg:max-w-[12%]',
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
const getTransformStyles = (
  smoothMouseX: MotionValue<number>,
  smoothMouseY: MotionValue<number>,
  xRange: [string, string],
  yRange: [string, string],
): TransformStyles => {
  return {
    x: useTransform(smoothMouseX, [0, 1], xRange),
    y: useTransform(smoothMouseY, [0, 1], yRange),
  }
}

export const MultiImageHero: React.FC<Page['hero']> = (props) => {
  const sectionRef = useRef<HTMLElement>(null)
  const { smoothMouseX, smoothMouseY, handleMouseMove } = useMouseMove()
  const isMobile = useMediaQuery('(max-width: 991px)')
  const Animate = isMobile ? 'div' : motion.div

  const canvasTransform = getTransformStyles(
    smoothMouseX,
    smoothMouseY,
    ['10vw', '-5vw'],
    ['10vh', '-5vh'],
  )

  const group1Transform = getTransformStyles(
    smoothMouseX,
    smoothMouseY,
    ['8%', '-8%'],
    ['8%', '-8%'],
  )

  const group2Transform = getTransformStyles(
    smoothMouseX,
    smoothMouseY,
    ['2%', '-2%'],
    ['2%', '-2%'],
  )

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
        <div key={index} className={`absolute w-full ${positions[index]}`}>
          <Frame
            resource={image}
            className="size-full aspect-[1/1]"
            imgClassName="size-full object-cover"
          />
        </div>
      ))}
    </Animate>
  )

  if (!props?.multiImage) return null
  const { heading, description, images, backgroundImage } = props.multiImage

  // Blur entrance animations for text
  const headingRef = useBlurEntrance<HTMLDivElement>({
    text: heading ? extractPlainText(heading) : null,
    triggerRef: sectionRef,
    start: 'top 100%',
    stagger: 0.2,
    initialBlur: 12,
    duration: 1.5,
    delay: 0.8,
  })

  const descriptionRef = useBlurEntrance<HTMLParagraphElement>({
    text: description || null,
    triggerRef: sectionRef,
    start: 'top 100%',
    stagger: 0.2,
    initialBlur: 12,
    duration: 1.5,
    delay: 2.0,
  })

  const group1Images = images.slice(0, images.length / 2)
  const group2Images = images.slice(images.length / 2)

  return (
    <section
      ref={sectionRef}
      id="relume"
      className="relative flex h-svh items-center justify-center overflow-hidden lg:h-screen"
      onMouseMove={handleMouseMove}
    >
      <GlowDesktop backgroundImage={backgroundImage} className="hidden xl:block" />
      <GlowTablet backgroundImage={backgroundImage} className="hidden md:block lg:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="md:hidden" />
      <GlowDesktop backgroundImage={backgroundImage} className="hidden xl:block" />
      <GlowTablet backgroundImage={backgroundImage} className="hidden md:block lg:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="md:hidden" />
      <div className="absolute h-[32rem] md:h-32 bg-gradient-to-t from-background-900 to-background-900/0 bottom-0 left-0 right-0 z-[1]" />
      <div className="px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container">
          <div className="relative z-10 text-center">
            <div ref={headingRef} className=" [&_*]:!type-h1 [&_*]:text-foreground-500 md:mb-6">
              <RichText data={heading} enableProse={false} enableGutter={false} />
            </div>

            <p ref={descriptionRef} className="type-body mt-3 text-foreground-500">
              {description}
            </p>
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
