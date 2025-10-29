import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { iconLink } from '@/fields/iconLink'

// Hidden global used solely for generating field types in isolation
export const TypeGenerator: GlobalConfig = {
  slug: 'typeGenerator',
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: 'iconLink',
      type: 'group',
      fields: iconLink,
    },
  ],
}
