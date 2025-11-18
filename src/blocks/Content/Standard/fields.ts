import type { Field } from 'payload'

import { tags } from '@/fields/tags'

import { defaults } from '../defaults'

export const standardFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    defaultValue: defaults.standard.image,
  },
  tags({
    overrides: {
      defaultValue: () => JSON.parse(JSON.stringify(defaults.standard.tags)),
    },
  }),
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
    defaultValue: () => JSON.parse(JSON.stringify(defaults.standard.bullets)),
    admin: {
      components: {
        RowLabel: '@/blocks/Content/Standard/BulletsRowLabel#BulletsRowLabel',
      },
    },
  },
]
