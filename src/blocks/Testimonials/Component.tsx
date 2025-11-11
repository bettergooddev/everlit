import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from '@/payload-types'
import { RenderTestimonials } from './RenderTestimonials'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const TestimonialsBlock: React.FC<TestimonialsBlockType> = async (props) => {
  const payload = await getPayload({ config: configPromise })

  // Populate full testimonial objects if they're only IDs or partial data
  let populatedTestimonials: Testimonial[] = []

  if (props?.testimonials && props.testimonials.length > 0) {
    const testimonialIds = props.testimonials.map((testimonial) =>
      typeof testimonial === 'object' && testimonial?.id ? testimonial.id : testimonial,
    )

    const testimonialsResult = await payload.find({
      collection: 'testimonials',
      depth: 2,
      limit: testimonialIds.length,
      pagination: false,
      overrideAccess: false,
      where: {
        id: {
          in: testimonialIds.filter((id): id is string => typeof id === 'string'),
        },
      },
    })

    populatedTestimonials = testimonialsResult.docs
  }

  return <RenderTestimonials {...props} testimonials={populatedTestimonials} />
}
