import type { Field } from 'payload'

export const archiveHeroFields: Field[] = [
  {
    name: 'heading',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
  },
]
