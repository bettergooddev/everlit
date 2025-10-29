import { Field } from 'payload'

export const lucideIcon: Field = {
  name: 'lucideIcon',
  label: 'Icon',
  type: 'text',
  // validate: (value) => {
  //   if (!value) {
  //     return 'Please select an icon'
  //   }
  //   return true
  // },
  admin: {
    components: {
      Field: '@/fields/lucideIcon/Select#Select',
    },
  },
  required: false,
  hasMany: false,
  localized: false,
}
