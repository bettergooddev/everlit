import type { Block } from 'payload'

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'Quote',
  labels: {
    plural: 'Quotes',
    singular: 'Quote',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
  ],
}

