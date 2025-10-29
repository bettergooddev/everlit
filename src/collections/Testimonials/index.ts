import type { GlobalConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Testimonials: GlobalConfig = {
  slug: 'testimonials',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'testimonials',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        // {
        //   name: 'rating',
        //   type: 'select',
        //   required: true,
        //   options: [
        //     { label: '0', value: '0' },
        //     { label: '0.5', value: '0.5' },
        //     { label: '1', value: '1' },
        //     { label: '1.5', value: '1.5' },
        //     { label: '2', value: '2' },
        //     { label: '2.5', value: '2.5' },
        //     { label: '3', value: '3' },
        //     { label: '3.5', value: '3.5' },
        //     { label: '4', value: '4' },
        //     { label: '4.5', value: '4.5' },
        //     { label: '5', value: '5' },
        //   ],
        // },
        {
          name: 'review',
          type: 'textarea',
          required: true,
        },
        {
          name: 'author',
          type: 'group',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              required: true,
            },
            {
              name: 'profilePicture',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
