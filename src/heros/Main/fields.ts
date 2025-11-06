import type { Field } from 'payload'

export const mainHeroFields: Field[] = [
  {
    name: 'heading',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
]
