import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { link } from './link'
import { dropdown } from './dropdown'

type NavigationItemType = (options?: { overrides?: Partial<GroupField> }) => Field

export const navigationItem: NavigationItemType = ({ overrides = {} } = {}) => {
  const navigationItemResult: GroupField = {
    name: 'navigationItem',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'type',
        type: 'radio',
        label: 'Action',
        admin: {
          layout: 'horizontal',
        },
        defaultValue: 'link',
        options: [
          {
            label: 'Link',
            value: 'link',
          },
          {
            label: 'Dropdown',
            value: 'dropdown',
          },
        ],
        required: true,
      },
      link({
        overrides: {
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
          },
        },
      }),
      dropdown({
        overrides: {
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
        },
      }),
    ],
  }

  return deepMerge(navigationItemResult, overrides)
}
