import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'
import { mediumImpactHeroFields } from '@/heros/MediumImpact/fields'

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

const mediumImpact: Field[] = [...mediumImpactHeroFields]

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
