import type { Field } from 'payload'

import { defaults } from './defaults'
import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'

export const mainHeroFields: Field[] = [
  {
    name: 'headingRich',
    label: 'Heading',
    type: 'richText',
    required: true,
    defaultValue: () => JSON.parse(JSON.stringify(defaults.headingRichText)),
    editor: lexicalEditor({
      features: [ParagraphFeature()],
    }),
  },
  // {
  //   name: 'heading',
  //   type: 'text',
  //   required: true,
  //   defaultValue: defaults.heading,
  // },
  {
    name: 'description',
    type: 'textarea',
    defaultValue: defaults.description,
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    defaultValue: defaults.image,
  },
]
