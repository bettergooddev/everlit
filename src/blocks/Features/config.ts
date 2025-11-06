import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
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
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    linkGroup({
      overrides: {
        name: 'Actions',
        maxRows: 2,
      },
    }),
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'subheading',
          type: 'text',
        },
      ],
      required: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        components: {
          RowLabel: '@/blocks/Features/Highlights/HighlightsRowLabel#HighlightsRowLabel',
        },
      },
    },
  ],
  labels: {
    plural: 'Features',
    singular: 'Feature',
  },
}
