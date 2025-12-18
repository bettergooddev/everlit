'use client'

import { Button } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import clsx from 'clsx'
import { Media, Page } from '@/payload-types'
import { Frame } from '@/components/Frame'
import RichText from '@/components/RichText'

export const MultiImageHero: React.FC<Page['hero']> = (props) => {
  const transformRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: transformRef })
  const animatedScrollYProgress = useSpring(scrollYProgress, {
    bounce: 0,
  })
  const yFirst = useTransform(animatedScrollYProgress, [0, 1], ['0vh', '-87.5vh'])
  const ySecond = useTransform(animatedScrollYProgress, [0, 1], ['0vh', '-39.6vh'])

  if (!props?.multiImage) return null
  const { heading, description, images } = props.multiImage

  return (
    <section id="relume" ref={transformRef} className="relative h-[150vh] px-[5%] md:h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute bottom-0 left-0 right-auto top-0 z-10">
          <motion.div className="flex flex-col gap-[26vw] pt-[70vh]" style={{ y: yFirst }}>
            {images.slice(0, 4).map((image, index: number) => (
              <div
                key={index}
                className={clsx('relative h-[35vw] pt-[120%] sm:h-auto', {
                  'w-[30vw] md:w-[28vw] lg:w-[22vw]': index === 0,
                  'left-[52vw] mt-[-46vw] w-[30vw] md:w-[28vw] lg:left-[58vw] lg:w-[22vw]':
                    index === 1,
                  'left-[4vw] mt-[-5vw] w-[28vw] md:w-[26vw] lg:w-[20vw]': index === 2,
                  'left-[64vw] mt-[-45vw] w-[26vw] md:w-[24vw] lg:w-[18vw]': index === 3,
                })}
              >
                <Frame
                  resource={image}
                  className="absolute inset-0 size-full"
                  imgClassName="size-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-auto right-0 top-0 z-0"
          style={{ y: ySecond }}
        >
          <div className="flex flex-col gap-[26vw] pt-[70vh]">
            {images.slice(4).map((image, index) => (
              <div
                key={index}
                className={clsx('relative h-[35vw] pt-[120%] opacity-75 sm:h-auto', {
                  'w-[28vw] md:w-[26vw] lg:w-[20vw]': index === 0,
                  'right-[50vw] mt-[-44vw] w-[26vw] md:w-[24vw] lg:right-[54vw] lg:w-[18vw]':
                    index === 1,
                })}
              >
                <Frame
                  resource={image}
                  className="absolute inset-0 size-full"
                  imgClassName="size-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
        <div className="container relative flex h-full items-center pb-24 pt-16 text-center md:pt-24 lg:py-28 mx-auto justify-center">
          <div>
            <div className="[&_*]:!type-h1 text-foreground-100">
              <RichText data={heading} enableProse={false} enableGutter={false} />
            </div>
            <p className="relative z-20 type-h3 mt-8 ">{description}</p>
            {/* <div className="relative z-20 mt-6 flex items-center justify-center gap-x-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div> */}
          </div>
        </div>
        <div className="absolute inset-0 -z-10 mt-[35rem] md:mt-[100vh]" />
      </div>
    </section>
  )
}
