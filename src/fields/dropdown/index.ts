import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { buildAppearanceField } from '../appearance'
import { link } from '../link'

type DropdownType = (options?: { overrides?: Partial<GroupField> }) => Field

export const dropdown: DropdownType = ({ overrides = {} } = {}) => {
  const dropdownResult: GroupField = {
    name: 'dropdown',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
        label: 'Label',
      },
      buildAppearanceField(),
      {
        name: 'items',
        type: 'array',
        label: 'Items',
        fields: [
          link({
            appearances: false,
            overrides: {
              label: false,
            },
          }),
        ],
        minRows: 1,
        admin: {
          components: {
            RowLabel: '@/fields/dropdown/LinkRowLabel#LinkRowLabel',
          },
          initCollapsed: true,
        },
      },
    ],
  }

  return deepMerge(dropdownResult, overrides)
}
