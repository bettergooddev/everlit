import type { Block } from 'payload'

import { tags } from '@/fields/tags'

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
      defaultValue: '691b3e3f98296faf9ec69eb8',
      required: true,
    },
  ],
}
