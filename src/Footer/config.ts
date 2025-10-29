import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { lucideIcon } from '@/fields/lucideIcon'
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
      name: 'groups',
      type: 'array',
      label: 'Groups',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
        },
        {
          name: 'linkGroups',
          type: 'array',
          label: 'Link Groups',
          fields: [
            link({
              appearances: false,
              overrides: {
                label: false,
              },
            }),
            lucideIcon,
          ],
          maxRows: 8,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/GroupsRowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
