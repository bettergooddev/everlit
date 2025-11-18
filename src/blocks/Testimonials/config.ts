import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { defaults } from './defaults'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  imageURL: '/api/media/file/thumbnail-testimonial.png',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'image',
      label: 'Variant',
      options: [
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'No Image',
          value: 'noImage',
        },
      ],
      required: true,
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: true,
    },
  ],
}
