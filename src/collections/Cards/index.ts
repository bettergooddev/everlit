import type { CollectionConfig, GlobalConfig, Field } from 'payload'
import { link } from '@/fields/link'

const Card: Field[] = [
  {
    name: 'style',
    type: 'select',
    label: 'Card Style',
    options: [
      {
        label: 'High Impact',
        value: 'high-impact',
      },
      {
        label: 'Low Impact',
        value: 'low-impact',
      },
    ],
    defaultValue: 'low-impact',
    required: true,
  },
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: {
      condition: (data, siblingData) => siblingData?.style === 'high-impact',
    },
  },
  {
    name: 'pattern',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      hidden: true,
    },
  },
  // When we had polka dots the values were 17, and 0.035.
  {
    name: 'patternSize',
    type: 'number',
    required: true,
    defaultValue: 10,
    admin: {
      hidden: true,
    },
  },
  {
    name: 'patternOpacity',
    type: 'number',
    required: true,
    defaultValue: 0.1,
    admin: {
      hidden: true,
    },
  },
  {
    name: 'eyebrow',
    type: 'text',
    required: true,
    admin: {
      condition: (data, siblingData) => siblingData?.style === 'high-impact',
    },
  },
  {
    name: 'name',
    type: 'text',
    required: true,
  },
  link({
    appearances: false,
    overrides: {
      required: true,
    },
  }),
  {
    name: 'hoverImage',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
]

export const Cards: GlobalConfig = {
  slug: 'card',
  label: {
    singular: 'Playing Cards',
    plural: 'Playing Cards',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      fields: Card,
      admin: {
        components: {
          RowLabel: '@/collections/Cards/RowLabel#RowLabel',
        },
      },
    },
  ],
}
