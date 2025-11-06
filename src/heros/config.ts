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
      type: 'group',
      fields: mainHeroFields,
      label: false,
      admin: {
        condition: (_, { type } = {}) => type === 'main',
      },
    },
    {
      name: 'study',
      type: 'group',
      fields: studyHeroFields,
      label: false,
      admin: {
        condition: (_, { type } = {}) => type === 'study',
      },
    },
    {
      name: 'archive',
      type: 'group',
      fields: archiveHeroFields,
      label: false,
      admin: {
        condition: (_, { type } = {}) => type === 'archive',
      },
    },
    {
      name: 'sub',
      type: 'group',
      fields: subHeroFields,
      label: false,
      admin: {
        condition: (_, { type } = {}) => type === 'sub',
      },
    },
  ],
  label: false,
}
