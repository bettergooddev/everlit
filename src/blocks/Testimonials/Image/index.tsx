'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import type { CarouselApi } from '@/components/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from '@/payload-types'
import { Frame } from '@/components/Frame'
import { Button } from '@/components/ui/button'
import Section from '@/components/Section'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'
import { Link } from '@/components/ui/link'
import { usePageTransition } from '@/providers/PageTransition'
import { useTextReveal } from '@/hooks/useTextReveal'

interface ImageProps extends Omit<TestimonialsBlockType, 'testimonials'> {
  testimonials: Testimonial[]
}

export const Image: React.FC<ImageProps> = ({ testimonials, backgroundImage }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const { isTransitioning } = usePageTransition()
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

  const isCarousel = testimonials.length > 1
  if (!testimonials || testimonials.length === 0) return null

  return (
    <Section ref={sectionRef} className="relative z-[1]">
      <GlowDesktop
        className="-z-[1] hidden lg:block"
        backgroundImage={backgroundImage}
        inView={isInView}
        isTransitioning={isTransitioning}
      />
      <GlowTablet
        className="-z-[1] hidden md:block lg:hidden"
        backgroundImage={backgroundImage}
        inView={isInView}
        isTransitioning={isTransitioning}
      />
      <GlowMobile
        className="-z-[1] md:hidden"
        backgroundImage={backgroundImage}
        inView={isInView}
        isTransitioning={isTransitioning}
      />

      <div className="container z-[1]">
        {isCarousel ? (
          <Carousel
            setApi={setApi}
            opts={{
              // loop: true,
              align: 'start',
            }}
            className="pb-24"
          >
            <div className="relative">
              <CarouselContent className="-ml-32">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-32">
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute top-full pt-12 flex w-full items-end justify-between z-[1]">
                <div className="mb-2.5 flex w-full items-start justify-start">
                  {testimonials.map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      variant={current === index + 1 ? 'default' : 'secondary'}
                      className={'mr-3 inline-block size-4 rounded-xs p-0'}
                    />
                  ))}
                </div>
                <div className="flex items-end justify-end gap-4">
                  <CarouselPrevious className="static right-0 top-0 size-12 -translate-y-0" />
                  <CarouselNext className="static right-0 top-0 size-12 -translate-y-0" />
                </div>
              </div>
            </div>
          </Carousel>
        ) : (
          <TestimonialCard testimonial={testimonials[0]!} />
        )}
      </div>
    </Section>
  )
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const quoteRef = useTextReveal<HTMLQuoteElement>({
    text: testimonial?.description,
    start: 'top 75%',
    end: 'top 30%',
  })

  if (!testimonial) return null

  const { image, description, author, caseStudy } = testimonial
  const caseStudySlug =
    typeof caseStudy === 'object' && caseStudy !== null && 'slug' in caseStudy
      ? caseStudy.slug
      : null

  return (
    <div className="lg:grid w-full lg:auto-cols-fr lg:grid-cols-2 items-center justify-center gap-12 md:gap-10 lg:gap-x-20 flex flex-col">
      {image && (
        <Frame
          resource={image}
          className="aspect-square w-full object-cover"
          imgClassName="aspect-square w-full object-cover"
        />
      )}
      <div className="flex flex-col items-start h-full justify-between gap-12 xl:gap-0">
        <blockquote ref={quoteRef} className="type-h4 xl:type-h3">
          {description}
        </blockquote>
        <div className="flex flex-nowrap items-end gap-5 justify-between w-full">
          <div className="flex flex-col">
            <p className="type-h4">{author.name}</p>
            <p className="[&_*]:type-body opacity-65 mt-1">
              <span>{author.position}</span>, <span>{author.company}</span>
            </p>
            {caseStudySlug && (
              <Link href={`/case-studies/${caseStudySlug}`} className="mt-6">
                <Button variant={'secondary'}>View Case Study</Button>
              </Link>
            )}
          </div>
          {author.logo && (
            <div>
              <Media
                resource={author.logo}
                className="h-8"
                imgClassName="size-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
