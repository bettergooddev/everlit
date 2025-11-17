import React from 'react'

import type { Page } from '@/payload-types'
import { Frame } from '@/components/Frame'
import * as motion from 'motion/react-client'
import { Media } from '@/components/Media'
import Section from '@/components/Section'

export const SubHero: React.FC<Page['hero']> = (props) => {
  if (!props?.sub) return null

  const { heading, description, image, backgroundImage } = props.sub

  return (
    <Section className="!my-[unset] relative">
      <div className=" container lg:grid lg:grid-cols-[3fr,2fr] pt-36 pb-52 gap-16 flex flex-col">
        <motion.div
          initial={{
            opacity: 0,
            rotate: 0,
            right: '-10%',
            top: '-140px',
            y: '0%',
            x: '40px',
            width: '1100px',
            height: '1100px',
          }}
          animate={{
            opacity: 1,
            rotateY: [14, -14, 14],
            translateY: [2, -2, 2],
            translateX: [5, -5, 5],
          }}
          transition={{
            opacity: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
            rotateY: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            translateY: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            translateX: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
          className="absolute z-[-1]"
        >
          <Media
            resource={backgroundImage}
            className="blur-xl object-right"
            imgClassName="size-full object-left"
          />
        </motion.div>

        <Frame resource={image} className=" size-full object-cover" />

        <div className="h-full flex flex-col-reverse lg:flex-col justify-between gap-8 xl:gap-0">
          <p className="max-w-[48ch]">{description}</p>
          <h1 className="flex flex-col gap-4 text-foreground-900">{heading}</h1>
        </div>
      </div>
    </Section>
  )
}
