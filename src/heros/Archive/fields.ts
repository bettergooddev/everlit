import type { Field } from 'payload'

import { defaults } from './defaults'

export const archiveHeroFields: Field[] = [
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
]
