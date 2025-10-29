import type { CollectionConfig, GlobalConfig, Field } from 'payload'
import { link } from '@/fields/link'
import { revalidateHours } from './hooks/revalidateHours'

const Day: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'openTime',
        type: 'text',
        required: true,
        admin: {
          width: '50%',
          placeholder: '9AM',
          condition: (data: any, siblingData: any) => !siblingData?.isClosed,
        },
      },
      {
        name: 'closeTime',
        type: 'text',
        required: true,
        admin: {
          width: '50%',
          placeholder: '5PM',
          condition: (data: any, siblingData: any) => !siblingData?.isClosed,
        },
      },
    ],
  },
  {
    name: 'isClosed',
    type: 'checkbox',
    label: 'Closed',
    required: true,
    defaultValue: false,
  },
]

const days = [
  { name: 'monday', label: 'Monday' },
  { name: 'tuesday', label: 'Tuesday' },
  { name: 'wednesday', label: 'Wednesday' },
  { name: 'thursday', label: 'Thursday' },
  { name: 'friday', label: 'Friday' },
  { name: 'saturday', label: 'Saturday' },
  { name: 'sunday', label: 'Sunday' },
]

const HourSet: Field[] = [
  {
    name: 'brand',
    type: 'relationship',
    relationTo: 'brands',
    required: true,
    maxDepth: 1,
    hasMany: false,
    admin: {
      hidden: true,
    },
  },
  // @ts-expect-error the convenience of this setup was worth it
  ...days.map((day) => ({
    name: day.name,
    type: 'group',
    label: day.label,
    fields: Day,
  })),
]

export const Hours: GlobalConfig = {
  slug: 'hours',
  label: {
    singular: 'Hours',
    plural: 'Hours',
  },
  hooks: {
    afterChange: [revalidateHours],
  },
  fields: [
    {
      type: 'ui',
      name: 'timeFormatInfo',
      admin: {
        components: {
          Field: '@/collections/Hours/TimeFormatInfo#TimeFormatInfo',
        },
      },
    },
    {
      name: 'hours',
      type: 'array',
      fields: HourSet,
      maxRows: 3,
      minRows: 3,
      admin: {
        components: {
          RowLabel: '@/collections/Hours/RowLabel#RowLabel',
        },
      },
    },
  ],
}
