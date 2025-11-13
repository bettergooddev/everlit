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
  ],
  graphQL: {
    singularName: 'CallToActionBlock',
  },
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
