import type { Block } from 'payload'

import { defaults } from './defaults'

export const Quote: Block = {
  slug: 'quote',
  interfaceName: 'Quote',
  imageURL: '/api/media/file/thumbnail-quote.png',
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
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      defaultValue: '6917054b9b5961a96f5e0173',
      required: true,
    },
  ],
}
