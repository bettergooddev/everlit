import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig<'brands'> = {
  slug: 'brands',
  defaultPopulate: {
    name: true,
  },
  admin: {
    defaultColumns: ['name', 'updatedAt'],
    useAsTitle: 'name',
    hidden: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
