import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

import { defaults } from './defaults'

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  imageURL: '/api/media/file/thumbnail-feature.png',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    linkGroup({
      overrides: {
        label: 'Actions',
        name: 'actions',
        maxRows: 2,
      },
    }),
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'subheading',
          type: 'text',
        },
      ],
      required: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        components: {
          RowLabel: '@/blocks/Features/Highlights/HighlightsRowLabel#HighlightsRowLabel',
        },
      },
    },
  ],
  labels: {
    plural: 'Features',
    singular: 'Feature',
  },
}
