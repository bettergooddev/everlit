import type { CollectionConfig, GlobalConfig, Field } from 'payload'
import { link } from '@/fields/link'

export const Background: CollectionConfig = {
  slug: 'background',
  admin: {
    useAsTitle: 'name',
    // hidden: true,
  },

  labels: {
    singular: 'Background',
    plural: 'Backgrounds',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'layers',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
