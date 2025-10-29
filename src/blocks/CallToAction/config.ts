import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  imageURL: '/api/media/file/block-cta.png',
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Style',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Fancy',
          value: 'fancy',
        },
      ],
      defaultValue: 'default',
      required: true,
    },
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2'] }),
            FixedToolbarFeature(),
            // InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    linkGroup({
      appearances: ['default', 'secondary', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
