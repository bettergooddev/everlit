import type { CollectionConfig, GlobalConfig, Field } from 'payload'
import { link } from '@/fields/link'

export const Masks: GlobalConfig = {
  slug: 'masks',
  admin: {
    hidden: true,
  },
  label: {
    singular: 'Mask',
    plural: 'Masks',
  },
  fields: [
    {
      name: 'masks',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'top',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'bottom',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
