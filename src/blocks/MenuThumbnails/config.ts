import type { Block } from 'payload'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { padding } from '@/fields/padding'

export const MenuThumbnails: Block = {
  slug: 'menuThumbnails',
  interfaceName: 'MenuThumbnailsBlock',
  imageURL: '/api/media/file/block-menu-thumbnails.png',
  fields: [
    padding(),
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2'] }),
          FixedToolbarFeature(),
        ],
      }),
      label: false,
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'menus',
      type: 'relationship',
      relationTo: 'menus',
      hasMany: true,
      required: true,
    },
  ],
  labels: {
    plural: 'Menu Thumbnails',
    singular: 'Menu Thumbnails',
  },
}
