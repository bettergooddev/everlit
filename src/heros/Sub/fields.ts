import type { Field } from 'payload'

import { defaults } from './defaults'

export const subHeroFields: Field[] = [
  {
    name: 'heading',
    type: 'text',
    required: true,
    defaultValue: defaults.heading,
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue: defaults.description,
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    defaultValue: defaults.image,
  },
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    defaultValue: defaults.backgroundImage,
  },
]
