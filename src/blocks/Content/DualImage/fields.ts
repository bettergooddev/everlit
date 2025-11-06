import type { Field } from 'payload'

export const dualImageFields: Field[] = [
  {
    name: 'images',
    type: 'upload',
    relationTo: 'media',
    hasMany: true,
    required: true,
    minRows: 2,
    maxRows: 2,
  },
]
