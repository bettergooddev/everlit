import type { Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type TagsType = (options?: {
  label?: string
  required?: boolean
  minRows?: number
  overrides?: Partial<Field>
}) => Field

export const tags: TagsType = ({
  label = 'Tags',
  required = false,
  minRows,
  overrides = {},
} = {}) => {
  const tagsField: Field = {
    name: 'tags',
    type: 'array',
    label,
    fields: [
      {
        name: 'tag',
        type: 'text',
        required: true,
      },
    ],
    admin: {
      components: {
        RowLabel: '@/fields/tags/TagsRowLabel#TagsRowLabel',
      },
    },
    ...(required && { required: true }),
    ...(minRows !== undefined && { minRows }),
  }

  return deepMerge(tagsField, overrides)
}
