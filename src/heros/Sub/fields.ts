import type { Field } from 'payload'

export const subHeroFields: Field[] = [
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
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    defaultValue: '6917054b9b5961a96f5e0173',
  },
]
