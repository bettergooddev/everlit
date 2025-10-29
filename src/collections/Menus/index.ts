import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { lucideIcon } from '@/fields/lucideIcon'

export const Menus: CollectionConfig = {
  slug: 'menus',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'icon'],
  },
  fields: [
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    lucideIcon,
    {
      name: 'pdf',
      label: 'PDF File',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'pdf' },
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      // required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
  ],
}
