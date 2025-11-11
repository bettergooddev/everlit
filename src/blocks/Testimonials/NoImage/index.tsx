'use client'

import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockType, Testimonial } from '@/payload-types'

interface NoImageProps extends Omit<TestimonialsBlockType, 'testimonials'> {
  testimonials: Testimonial[]
}

export const NoImage: React.FC<NoImageProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">{/* No Image variant placeholder */}</div>
    </section>
  )
}

