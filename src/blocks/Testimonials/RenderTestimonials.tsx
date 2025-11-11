import React from 'react'

import type { TestimonialsBlock, Testimonial } from '@/payload-types'

import { Image } from './Image'
import { NoImage } from './NoImage'

interface RenderTestimonialsProps extends Omit<TestimonialsBlock, 'testimonials'> {
  testimonials: Testimonial[]
}

const testimonialsComponents: Record<
  NonNullable<TestimonialsBlock['variant']>,
  React.FC<RenderTestimonialsProps>
> = {
  image: Image,
  noImage: NoImage,
}

export const RenderTestimonials: React.FC<RenderTestimonialsProps> = (props) => {
  const { variant } = props

  if (!variant) return null

  const TestimonialsToRender = testimonialsComponents[variant]

  if (!TestimonialsToRender) return null

  return <TestimonialsToRender {...props} />
}
