import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

const Event: Field[] = [
  {
    name: 'year',
    type: 'number',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
]

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
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
      label: false,
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: false,
    },
    {
      name: 'events',
      type: 'array',
      fields: Event,
      required: true,
      minRows: 1,
      admin: {
        components: {
          RowLabel: '@/blocks/Timeline/RowLabel#RowLabel',
        },
      },
    },
  ],
}
