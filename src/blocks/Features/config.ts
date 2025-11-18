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
      defaultValue: defaults.heading,
    },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue: defaults.subheading,
    },
    linkGroup({
      overrides: {
        label: 'Actions',
        name: 'actions',
        maxRows: 2,
        defaultValue: () => JSON.parse(JSON.stringify(defaults.actions)),
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
      defaultValue: () => JSON.parse(JSON.stringify(defaults.highlights)),
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
