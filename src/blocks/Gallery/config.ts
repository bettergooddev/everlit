import type { Block } from 'payload'

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
