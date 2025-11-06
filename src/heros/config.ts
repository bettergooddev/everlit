import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'
import { studyHeroFields } from '@/heros/Study/fields'

const logo: Field[] = [
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  link(),
]

const main: Field[] = [
  {
    name: 'logos',
    type: 'array',
    fields: logo,
    maxRows: 3,
    admin: {
      components: {
        RowLabel: '@/heros/Main/LogosRowLabel#LogosRowLabel',
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

const study: Field[] = [...studyHeroFields]

const archive: Field[] = [
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
      defaultValue: 'archive',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Main',
          value: 'main',
        },
        {
          label: 'Study',
          value: 'study',
        },
        {
          label: 'Archive',
          value: 'archive',
        },
      ],
      required: true,
    },

    {
      name: 'main',
      type: 'array',
      fields: main,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'main',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },

    {
      name: 'study',
      type: 'array',
      fields: study,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'study',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },

    {
      name: 'archive',
      type: 'array',
      fields: archive,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'archive',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },
  ],
  label: false,
}
