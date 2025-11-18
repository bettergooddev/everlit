import type { Block } from 'payload'

import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'

import { defaults } from './defaults'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  imageURL: '/api/media/file/thumbnail-cta-form.png',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      required: true,
      defaultValue: defaults.heading,
      editor: lexicalEditor({
        features: [ParagraphFeature()],
      }),
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      defaultValue: defaults.form,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      defaultValue: defaults.backgroundImage,
      required: true,
      // hidden: true,
    },
  ],
  graphQL: {
    singularName: 'CallToActionBlock',
  },
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
