import type { GlobalConfig } from 'payload'

import { navigationItem } from '@/fields/navigationItem'
import { link } from '@/fields/link'
import { revalidateNavigation } from './hooks/revalidateNavigation'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
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
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'desktopLogo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Desktop Logo',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                width: '50%',
              },
            },
            {
              name: 'mobileLogo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Mobile Logo',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                width: '50%',
              },
            },
          ],
        },
        link({
          appearances: false,
          overrides: {
            label: false,
          },
        }),
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [navigationItem()],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Navigation/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'actions',
      type: 'array',
      label: 'Action Items',
      fields: [navigationItem()],
      maxRows: 4,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Navigation/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateNavigation],
  },
}
