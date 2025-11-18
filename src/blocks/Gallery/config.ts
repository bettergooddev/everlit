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
      defaultValue: () => JSON.parse(JSON.stringify(defaults.images)),
    },
  ],
  labels: {
    plural: 'Galleries',
    singular: 'Gallery',
  },
}
