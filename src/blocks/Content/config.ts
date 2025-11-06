import type { Block } from 'payload'

import { dualImageFields } from './DualImage/fields'
import { gridFields } from './Grid/fields'
import { standardFields } from './Standard/fields'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'dualImage',
      label: 'Variant',
      options: [
        {
          label: 'Standard',
          value: 'standard',
        },
        {
          label: 'Dual Image',
          value: 'dualImage',
        },
        {
          label: 'Grid',
          value: 'grid',
        },
      ],
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'standard',
      type: 'group',
      fields: standardFields,
      label: false,
      admin: {
        condition: (_, { variant } = {}) => variant === 'standard',
      },
    },
    {
      name: 'dualImage',
      type: 'group',
      fields: dualImageFields,
      label: false,
      admin: {
        condition: (_, { variant } = {}) => variant === 'dualImage',
      },
    },
    {
      name: 'grid',
      type: 'group',
      fields: gridFields,
      label: false,
      admin: {
        condition: (_, { variant } = {}) => variant === 'grid',
      },
    },
    {
      name: 'reverseLayout',
      type: 'checkbox',
      label: 'Reverse Layout',
      defaultValue: false,
    },
  ],
}
