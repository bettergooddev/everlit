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

    // Get unique IDs to fetch
    const uniqueIds = Array.from(
      new Set(testimonialIds.filter((id): id is string => typeof id === 'string')),
    )

    const testimonialsResult = await payload.find({
      collection: 'testimonials',
      depth: 2,
      limit: uniqueIds.length,
      pagination: false,
      overrideAccess: false,
      where: {
        id: {
          in: uniqueIds,
        },
      },
    })

    // Create a map of fetched testimonials by ID for quick lookup
    const testimonialsMap = new Map<string, Testimonial>()
    testimonialsResult.docs.forEach((testimonial) => {
      if (testimonial.id) {
        testimonialsMap.set(testimonial.id, testimonial)
      }
    })

    // Map over original array to preserve order and duplicates
    populatedTestimonials = testimonialIds
      .map((id) => {
        if (typeof id === 'string') {
          return testimonialsMap.get(id)
        }
        return null
      })
      .filter((testimonial): testimonial is Testimonial => testimonial !== null)
  }

  return <RenderTestimonials {...props} testimonials={populatedTestimonials} />
}
