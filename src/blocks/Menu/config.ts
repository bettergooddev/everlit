import type { Block } from 'payload'

export const Menu: Block = {
  slug: 'menu',
  interfaceName: 'MenuBlock',
  imageURL: '/api/media/file/block-menu.png',
  fields: [
    {
      name: 'heading',
      type: 'text',
      // required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },

    {
      name: 'menus',
      type: 'relationship',
      relationTo: 'menus',
      hasMany: true,
      // required: true,
    },
  ],
  labels: {
    plural: 'Menus',
    singular: 'Menu',
  },
}
