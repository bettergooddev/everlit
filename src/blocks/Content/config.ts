import type { Block } from 'payload'
import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'

import { dualImageFields } from './DualImage/fields'
import { gridFields } from './Grid/fields'
import { standardFields } from './Standard/fields'

import { defaults } from './defaults'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  imageURL: '/api/media/file/thumbnail-content.png',
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
      type: 'richText',
      required: true,
      defaultValue: defaults.base.heading,
      editor: lexicalEditor({
        features: [ParagraphFeature()],
      }),
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: defaults.base.desc,
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
