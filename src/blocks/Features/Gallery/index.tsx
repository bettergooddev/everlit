import React from 'react'
import * as motion from 'motion/react-client'
import { fadeUpInView } from '@/utilities/animations'
import { cva } from 'class-variance-authority'
import { tv } from 'tailwind-variants'

import type { FeaturesBlock, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Heading } from '@/components/Heading'
import { Frame } from '@/components/Frame'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const classes = {
  grid: tv({
    variants: {
      imageCount: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2 md:max-w-3xl md:mx-auto',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      imageCount: 3,
    },
  }),
  container: tv({
    variants: {
      style: {
        grid: 'container',
        carousel: 'w-full px-4',
      },
    },
  }),
}

export const Gallery: React.FC<FeaturesBlock> = ({ heading, subheading, images }) => {
  const hasSupportedNumberOfImages =
    images?.length && images.length in classes.grid['variants']['imageCount']

  return (
    <div>
      <Heading heading={heading} subheading={subheading} className="container" />
      <div
        className={classes.container({ style: hasSupportedNumberOfImages ? 'grid' : 'carousel' })}
      >
        {hasSupportedNumberOfImages ? (
          <GalleryGrid images={images || []} />
        ) : (
          <GalleryCarousel images={images || []} />
        )}
      </div>
    </div>
  )
}

const GalleryGrid = ({ images }: { images: (string | MediaType)[] }) => {
  const imageCount = images?.length as keyof (typeof classes.grid)['variants']['imageCount']

  return (
    <div className={cn('grid gap-6', classes.grid({ imageCount }))}>
      {images.map((image, index) => (
        <motion.div key={index} className="relative" {...fadeUpInView(index)}>
          <Frame
            resource={image}
            className="w-full overflow-hidden max-w-xs sm:max-w-none mx-auto"
            imgClassName="w-full h-auto scale-[1.025]"
          />
        </motion.div>
      ))}
    </div>
  )
}

const GalleryCarousel = ({ images }: { images: (string | MediaType)[] }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4 md:-ml-6 ">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
            <motion.div className="relative" {...fadeUpInView(index, 0.1, 0.5)}>
              <Frame
                resource={image}
                className="w-full overflow-hidden"
                imgClassName="w-full h-auto scale-[1.025]"
              />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-6 md:left-12 theme-pizza [&_svg]:!text-primary" />
      <CarouselNext className="right-6 md:right-12 theme-pizza [&_svg]:!text-primary" />
    </Carousel>
  )
}
