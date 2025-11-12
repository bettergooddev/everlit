import type { Field } from 'payload'

import { tags } from '@/fields/tags'

export const standardFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  tags(),
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
    admin: {
      components: {
        RowLabel: '@/blocks/Content/Standard/BulletsRowLabel#BulletsRowLabel',
      },
    },
  },
]
