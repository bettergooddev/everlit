import type { Field } from 'payload'

export type Appearance = 'default' | 'outline' | 'secondary'

export const appearanceOptions: Record<Appearance, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

/**
 * Build a select Field for Appearance selection.
 * @param allowed Array of allowed appearances. Defaults to all.
 */
export const buildAppearanceField = (allowed?: Appearance[]): Field => {
  const options = (
    allowed && allowed.length > 0 ? allowed : (['default', 'outline', 'secondary'] as Appearance[])
  ).map((appearance) => appearanceOptions[appearance])

  return {
    name: 'appearance',
    type: 'select',
    admin: {
      description: 'Choose how this item should be rendered.',
    },
    defaultValue: 'default',
    options,
  }
}
