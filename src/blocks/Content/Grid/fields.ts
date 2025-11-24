import type { Field } from 'payload'

import { tags } from '@/fields/tags'

import { defaults } from '../defaults'

export const gridFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    defaultValue: defaults.grid.image,
  },
  tags({
    overrides: {
      defaultValue: () => JSON.parse(JSON.stringify(defaults.grid.tags)),
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
    defaultValue: () => JSON.parse(JSON.stringify(defaults.grid.bullets)),
    admin: {
      components: {
        RowLabel: '@/blocks/Content/Grid/BulletsRowLabel#BulletsRowLabel',
      },
    },
  },
]
