import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const highlightField: Field[] = [
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
]

const gallery: Field[] = [
  {
    name: 'images',
    type: 'upload',
    relationTo: 'media',
    hasMany: true,
    required: true,
    minRows: 2,
  },
  // {
  //   name: 'reverse',
  //   type: 'checkbox',
  //   label: 'Reverse Layout',
  //   defaultValue: false,
  // },
]

const highlights: Field[] = [
  {
    name: 'highlights',
    type: 'array',
    fields: highlightField,
    required: true,
    minRows: 3,
    maxRows: 3,
    admin: {
      components: {
        RowLabel: '@/blocks/Features/Highlights/HighlightsRowLabel#HighlightsRowLabel',
      },
    },
  },
]

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'gallery',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Gallery',
          value: 'gallery',
        },
        {
          label: 'Highlights',
          value: 'highlights',
        },
      ],
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

    // @ts-expect-error the convience of this set up was worth it
    ...gallery.map((field: Field) => ({
      ...field,
      admin: {
        ...field.admin,
        condition: (_: any, { type }: { type: string }) => type === 'gallery',
      },
    })),

    // @ts-expect-error the convience of this set up was worth it
    ...highlights.map((field: Field) => ({
      ...field,
      admin: {
        ...field.admin,
        condition: (_: any, { type }: { type: string }) => type === 'highlights',
      },
    })),
  ],
  labels: {
    plural: 'Features',
    singular: 'Feature',
  },
}
