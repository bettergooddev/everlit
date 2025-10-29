import type { Block } from 'payload'

export const Flair: Block = {
  slug: 'flair',
  interfaceName: 'FlairBlock',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
