import type { Block } from 'payload'

import { defaults } from './defaults'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  imageURL: '/api/media/file/thumbnail-gallery.png',
  fields: [
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
  ],
  labels: {
    plural: 'Galleries',
    singular: 'Gallery',
  },
}
