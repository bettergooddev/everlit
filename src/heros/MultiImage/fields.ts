import type { Field } from 'payload'

import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'

import { defaults } from './defaults'

export const multiImageHeroFields: Field[] = [
  {
    name: 'heading',
    label: 'Heading',
    type: 'richText',
    required: true,
    defaultValue: () => JSON.parse(JSON.stringify(defaults.heading)),
    editor: lexicalEditor({
      features: [ParagraphFeature()],
    }),
  },
  {
    name: 'description',
    type: 'textarea',
    defaultValue: defaults.description,
  },
  {
    name: 'images',
    type: 'upload',
    relationTo: 'media',
    hasMany: true,
    required: true,
    minRows: 8,
    maxRows: 8,
    defaultValue: () => JSON.parse(JSON.stringify(defaults.images)),
  },
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    defaultValue: defaults.backgroundImage,
  },
]

