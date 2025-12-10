import React from 'react'

import type { Page } from '@/payload-types'
import Section from '@/components/Section'
import { motion } from 'motion/react'
import { Frame } from '@/components/Frame'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MainHero: React.FC<Page['hero']> = (props) => {
  if (!props?.main) return null

  const { headingRich, description, image } = props.main

  return (
    <Section className="relative min-h-screen !mt-0 flex">
      <Frame
        resource={image}
        className="size-full object-cover absolute inset-0 z-[0]"
        imgClassName="size-full object-cover"
      />

      <div className="absolute top-0 left-0 w-2/3 h-full z-[0] bg-gradient-to-r from-black/60 to-transparent opacity-100 " />

      <div className="container-full flex flex-col justify-end z-[1] relative p-24 ">
        {/* <div className="relative"> */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle,black_30%,transparent_90%)] -translate-x-[15%] opacity-75 blur-xl z-[0] scale-125" /> */}

        <h1 className="text-foreground-900 max-w-[5ch] [text-shadow:0_0_10px_rgba(255,255,255,0.5)] shadow-yellow-300 z-[1] relative [&_*]:!type-h1">
          <RichText data={headingRich} enableGutter={false} enableProse={false} />
        </h1>

        <h3 className="text-foreground-500 max-w-[24ch] mt-8 z-[1] relative">{description}</h3>
        {/* </div> */}
      </div>
    </Section>
  )
}
