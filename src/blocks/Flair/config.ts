import type { Block } from 'payload'

export const Flair: Block = {
  slug: 'flair',
  interfaceName: 'FlairBlock',
  imageURL: '/api/media/file/block-flair.png',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
