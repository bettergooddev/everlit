import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
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

const highImpact: Field[] = [
  {
    name: 'logos',
    type: 'array',
    fields: logo,
    maxRows: 3,
    admin: {
      components: {
        RowLabel: '@/heros/HighImpact/LogosRowLabel#LogosRowLabel',
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

const mediumImpact: Field[] = [
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
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
    name: 'Buttons',
    type: 'group',
    label: false,
    fields: [
      {
        name: 'primaryButton',
        type: 'array',
        fields: [link()],
        maxRows: 1,
        minRows: 1,
        admin: {
          components: {
            RowLabel: '@/heros/MediumImpact/ButtonRowLabels#PrimaryButtonRowLabel',
          },
        },
      },
      {
        name: 'secondaryButton',
        type: 'array',
        fields: [link()],
        maxRows: 1,
        minRows: 1,
        admin: {
          components: {
            RowLabel: '@/heros/MediumImpact/ButtonRowLabels#SecondaryButtonRowLabel',
          },
        },
      },

      {
        name: 'tertiaryButton',
        type: 'array',
        fields: [link()],
        maxRows: 1,
        minRows: 1,
        admin: {
          components: {
            RowLabel: '@/heros/MediumImpact/ButtonRowLabels#TertiaryButtonRowLabel',
          },
        },
      },
    ],
  },

  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'theme',
    type: 'select',
    options: [
      {
        label: 'Cafe',
        value: 'cafe',
      },
      {
        label: 'Sugar Shack',
        value: 'sugar-shack',
      },
      {
        label: 'Pizza',
        value: 'pizza',
      },
    ],
    required: true,
  },
]

const lowImpact: Field[] = [
  {
    name: 'heading',
    type: 'text',
    required: true,
  },
  {
    name: 'subheading',
    type: 'textarea',
  },
]

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },

    {
      name: 'highImpact',
      type: 'array',
      fields: highImpact,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },

    {
      name: 'mediumImpact',
      type: 'array',
      fields: mediumImpact,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },

    {
      name: 'lowImpact',
      type: 'array',
      fields: lowImpact,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'lowImpact',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },
  ],
  label: false,
}
