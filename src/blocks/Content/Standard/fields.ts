import type { Field } from 'payload'

export const standardFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'tags',
    type: 'array',
    label: 'Tags',
    fields: [
      {
        name: 'tag',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'bullets',
    type: 'array',
    label: 'Bullets',
    fields: [
      {
        name: 'bullet',
        type: 'text',
        required: true,
      },
    ],
  },
]
