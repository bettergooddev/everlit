import type { Block } from 'payload'

import { tags } from '@/fields/tags'

export const Rolodex: Block = {
  slug: 'rolodex',
  interfaceName: 'Rolodex',
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
    },
  ],
}
