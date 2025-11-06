import type { Field } from 'payload'

import { link } from '@/fields/link'

const logo: Field[] = [
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  link(),
]

export const mainHeroFields: Field[] = [
  {
    name: 'logos',
    type: 'array',
    fields: logo,
    maxRows: 3,
    admin: {
      components: {
        RowLabel: '@/heros/Main/LogosRowLabel#LogosRowLabel',
      },
    },
  },
  {
    name: 'heading',
    type: 'text',
    required: true,
  },
  {
    name: 'subheading',
    type: 'textarea',
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    hasMany: true,
    required: true,
    maxRows: 21,
  },
  {
    name: 'backgroundLayers',
    type: 'upload',
    relationTo: 'media',
    hasMany: true,
    maxRows: 3,
    minRows: 3,
  },
]

