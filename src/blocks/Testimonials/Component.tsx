import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { TestimonialsCarousel } from './Carousel'

export const TestimonialsBlock: React.FC<TestimonialsBlockType> = async ({}) => {
  const payload = await getPayload({ config: configPromise })

  const testimonialsGlobal = (await payload.findGlobal({
    slug: 'testimonials',
    depth: 2,
  })) as Testimonial | null

  const testimonials = testimonialsGlobal?.testimonials || []

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return <TestimonialsCarousel testimonials={testimonials} />
}
