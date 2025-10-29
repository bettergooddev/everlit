import type { Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import type { Padding } from '@/utilities/padding'

type PaddingFieldType = (options?: { overrides?: Partial<Field> }) => Field

export const padding: PaddingFieldType = ({ overrides = {} } = {}) => {
  const generatedPadding: Field = {
    name: 'padding',
    type: 'select',
    defaultValue: 'top-bottom',
    options: [
      { label: 'Top & Bottom', value: 'top-bottom' },
      { label: 'Top', value: 'top' },
      { label: 'Bottom', value: 'bottom' },
      { label: 'None', value: 'none' },
    ],
  }

  return deepMerge(generatedPadding, overrides)
}
