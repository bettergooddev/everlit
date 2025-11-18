import type { Block } from 'payload'

import { tags } from '@/fields/tags'

import { defaults } from './defaults'

export const Rolodex: Block = {
  slug: 'rolodex',
  interfaceName: 'Rolodex',
  imageURL: '/api/media/file/thumbnail-rolodex.png',
  labels: {
    plural: 'Rolodex',
    singular: 'Rolodex',
  },
  fields: [
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        tags({
          required: true,
          minRows: 1,
        }),
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
          RowLabel: '@/blocks/Rolodex/HighlightsRowLabel#HighlightsRowLabel',
        },
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      defaultValue: defaults.backgroundImage,
      required: true,
    },
  ],
}
