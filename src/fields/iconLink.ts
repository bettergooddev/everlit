import { Field } from 'payload'
import { lucideIcon } from './lucideIcon'
import { link } from './link'

export const iconLink: Field[] = [
  link({
    appearances: false,
    overrides: {
      required: true,
    },
  }),
  lucideIcon,
]
