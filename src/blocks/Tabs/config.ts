import type { Block } from 'payload'

import { defaults } from './defaults'

export const Tabs: Block = {
  slug: 'tabs',
  interfaceName: 'Tabs',
  imageURL: '/api/media/file/thumbnail-tabs.png',
  labels: {
    plural: 'Tabs',
    singular: 'Tabs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: defaults.heading,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: defaults.description,
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'media',
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
          name: 'description',
          type: 'textarea',
        },
      ],
      required: true,
      minRows: 1,
      defaultValue: () => JSON.parse(JSON.stringify(defaults.highlights)),
      admin: {
        components: {
          RowLabel: '@/blocks/Tabs/HighlightsRowLabel#HighlightsRowLabel',
        },
      },
    },
    {
      name: 'reverseLayout',
      type: 'checkbox',
      label: 'Reverse Layout',
      defaultValue: false,
    },
  ],
}
