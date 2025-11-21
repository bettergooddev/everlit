import type { Field } from 'payload'

import { defaults } from '../defaults'

export const dualImageFields: Field[] = [
  {
    name: 'images',
    type: 'upload',
    relationTo: 'media',
    hasMany: true,
    required: true,
    minRows: 2,
    maxRows: 2,
    defaultValue: () => JSON.parse(JSON.stringify(defaults.dualImage.images)),
  },
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    defaultValue: defaults.dualImage.backgroundImage,
  },
]
