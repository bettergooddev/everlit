import type { Field } from 'payload'

import { mainHeroFields } from '@/heros/Main/fields'
import { archiveHeroFields } from '@/heros/Archive/fields'
import { studyHeroFields } from '@/heros/Study/fields'
import { subHeroFields } from '@/heros/Sub/fields'

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
          label: 'Homepage',
          value: 'main',
        },
        {
          label: 'Sub-Page',
          value: 'sub',
        },
        {
          label: 'Case Study',
          value: 'study',
        },
        {
          label: 'Simple',
          value: 'archive',
        },
      ],
      required: true,
    },

    {
      name: 'main',
      type: 'array',
      fields: mainHeroFields,
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
      fields: studyHeroFields,
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
      fields: archiveHeroFields,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'archive',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },

    {
      name: 'sub',
      type: 'array',
      fields: subHeroFields,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'sub',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },
  ],
  label: false,
}
