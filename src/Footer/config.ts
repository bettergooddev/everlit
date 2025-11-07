import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Image',
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'links',
        label: 'Links',
      },
    }),
    linkGroup({
      overrides: {
        name: 'buttons',
        label: 'Buttons',
      },
    }),
    {
      name: 'socials',
      type: 'array',
      label: 'Socials',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
