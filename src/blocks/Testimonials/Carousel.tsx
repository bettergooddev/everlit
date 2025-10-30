'use client'

import React, { useState, useEffect } from 'react'
import type { CarouselApi } from '@/components/ui/carousel'
import clsx from 'clsx'
import { PlayCircle } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Media } from '@/components/Media'
import { getClientSideURL } from '@/utilities/getURL'
import type { Media as MediaType } from '@/payload-types'

type TestimonialItem = {
  description: string
  image?: MediaType | string | null
  video?: string | null
  author: {
    name: string
    position: string
    company: string
    logo: MediaType | string
  }
}

type Props = {
  testimonials: TestimonialItem[]
}

export const TestimonialsCarousel: React.FC<Props> = ({ testimonials }) => {
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

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialItem }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false)

  const getImageUrl = (): string | null => {
    if (!testimonial.image) return null
    if (typeof testimonial.image === 'string') return testimonial.image
    if (typeof testimonial.image === 'object' && testimonial.image.url) {
      return `${getClientSideURL()}${testimonial.image.url}`
    }
    return null
  }

  const getLogoUrl = (): string | null => {
    if (!testimonial.author.logo) return null
    if (typeof testimonial.author.logo === 'string') return testimonial.author.logo
    if (typeof testimonial.author.logo === 'object' && testimonial.author.logo.url) {
      return `${getClientSideURL()}${testimonial.author.logo.url}`
    }
    return null
  }

  const imageUrl = getImageUrl()
  const logoUrl = getLogoUrl()

  return (
    <div className="grid w-full auto-cols-fr grid-cols-1 items-center justify-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-x-20">
      {imageUrl && testimonial.video && (
        <div className="order-last md:order-first">
          <Dialog>
            <DialogTrigger asChild>
              <button className="relative flex w-full items-center justify-center">
                <Media
                  resource={testimonial.image}
                  className="size-full object-cover"
                  imgClassName="size-full object-cover"
                />
                <span className="absolute inset-0 z-10 bg-black/50" />
                <PlayCircle className="absolute z-20 size-16 text-white fill-white" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-black p-0">
              {!isIframeLoaded && <Loader2 className="mx-auto size-16 animate-spin text-white" />}
              <iframe
                className={clsx('z-0 mx-auto aspect-video size-full md:w-[738px] lg:w-[940px]', {
                  visible: isIframeLoaded,
                  hidden: !isIframeLoaded,
                })}
                src={testimonial.video}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsIframeLoaded(true)}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}
      {imageUrl && !testimonial.video && (
        <div className="order-last md:order-first">
          <Media
            resource={testimonial.image}
            className="size-full object-cover"
            imgClassName="size-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col items-start">
        <blockquote className="type-h3">{testimonial.description}</blockquote>
        <div className="mt-6 flex flex-nowrap items-center gap-5 md:mt-8">
          <div>
            <p className="font-semibold">{testimonial.author.name}</p>
            <p>
              <span>{testimonial.author.position}</span>, <span>{testimonial.author.company}</span>
            </p>
          </div>
          {logoUrl && (
            <>
              <div className="mx-4 w-px self-stretch bg-background-alternative sm:mx-0" />
              <div>
                <Media
                  resource={testimonial.author.logo}
                  className="max-h-12"
                  imgClassName="max-h-12"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
