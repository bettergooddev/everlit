import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'type',
    type: 'select',
    defaultValue: 'content',
    options: [
      {
        label: 'Text',
        value: 'content',
      },
      {
        label: 'Media',
        value: 'media',
      },
    ],
    admin: {
      description: 'Choose whether this column contains text content or media',
    },
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: 'Content',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.type === 'content'
      },
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.type === 'content'
      },
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink) && siblingData?.type === 'content'
        },
      },
    },
  }),
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    label: 'Media',
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.type === 'media'
      },
    },
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  imageURL: '/api/media/file/block-content.png',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Reverse Layout',
      defaultValue: false,
    },
  ],
}
