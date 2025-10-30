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
      fields: [
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'video',
          type: 'text',
          admin: {
            description:
              'YouTube or Vimeo embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)',
          },
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
              name: 'position',
              type: 'text',
              required: true,
            },
            {
              name: 'company',
              type: 'text',
              required: true,
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'caseStudy',
          type: 'relationship',
          relationTo: 'case-studies',
        },
      ],
    },
  ],
}
