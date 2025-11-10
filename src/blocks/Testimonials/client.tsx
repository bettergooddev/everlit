'use client'

import React, { useState, useEffect } from 'react'
import type { CarouselApi } from '@/components/ui/carousel'
import clsx from 'clsx'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from '@/payload-types'

interface TestimonialsClientProps extends Omit<TestimonialsBlockType, 'testimonials'> {
  testimonials: Testimonial[]
}

export const TestimonialsClient: React.FC<TestimonialsClientProps> = ({ testimonials }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: 'start',
          }}
          className="overflow-hidden"
        >
          <div className="relative pt-20 md:pb-20 md:pt-0">
            <CarouselContent className="ml-0">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-0">
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-0 flex w-full items-start justify-between md:bottom-0 md:top-auto md:items-end">
              <div className="mt-2.5 flex w-full items-start justify-start md:mb-2.5 md:mt-0">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={clsx('mx-[3px] inline-block size-2 rounded-full', {
                      'bg-black': current === index + 1,
                      'bg-neutral-light': current !== index + 1,
                    })}
                  />
                ))}
              </div>
              <div className="flex items-end justify-end gap-2 md:gap-4">
                <CarouselPrevious className="static right-0 top-0 size-12 -translate-y-0" />
                <CarouselNext className="static right-0 top-0 size-12 -translate-y-0" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  if (!testimonial) {
    return null
  }

  const { image, description, author } = testimonial

  return (
    <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
      {image && (
        <div className="order-last md:order-first">
          <Media
            resource={image}
            className="aspect-square w-full object-cover"
            imgClassName="aspect-square w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col items-start">
        <blockquote className="type-h3">{description}</blockquote>
        <div className="mt-6 flex flex-nowrap items-center gap-5 md:mt-8">
          <div>
            <p className="font-semibold">{author.name}</p>
            <p>
              <span>{author.position}</span>, <span>{author.company}</span>
            </p>
          </div>
          {author.logo && (
            <>
              <div className="mx-4 w-px self-stretch bg-background-alternative sm:mx-0" />
              <div>
                <Media resource={author.logo} className="max-h-12" imgClassName="max-h-12" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
