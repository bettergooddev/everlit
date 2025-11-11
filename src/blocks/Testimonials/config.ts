import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
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
