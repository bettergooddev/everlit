import type { Block } from 'payload'

import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: [ParagraphFeature()],
      }),
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      defaultValue: '6915cd5c765fbb41ce17e08e',
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
