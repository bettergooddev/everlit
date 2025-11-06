import type { Block } from 'payload'

export const Tabs: Block = {
  slug: 'tabs',
  interfaceName: 'Tabs',
  labels: {
    plural: 'Tabs',
    singular: 'Tabs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
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
    },
    {
      name: 'reverseLayout',
      type: 'checkbox',
      label: 'Reverse Layout',
      defaultValue: false,
    },
  ],
}
