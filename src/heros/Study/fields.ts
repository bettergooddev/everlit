import { defaultLexical } from '@/fields/defaultLexical'
import {
  BoldFeature,
  ItalicFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

import { defaults } from './defaults'

export const studyHeroFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    defaultValue: defaults.image,
  },
  {
    name: 'heading',
    type: 'text',
    defaultValue: defaults.heading,
  },
  {
    name: 'type',
    type: 'select',
    options: [
      {
        label: 'Residential',
        value: 'residential',
      },
      {
        label: 'Commercial',
        value: 'commercial',
      },
    ],
    required: true,
    defaultValue: defaults.type,
  },
  {
    name: 'date',
    type: 'text',
    required: true,
    defaultValue: defaults.date,
  },
  {
    name: 'location',
    type: 'text',
    required: true,
    defaultValue: defaults.location,
  },
  {
    name: 'description',
    type: 'richText',
    editor: defaultLexical,
    label: 'Description',
    defaultValue: () => JSON.parse(JSON.stringify(defaults.description)),
  },
  {
    name: 'collaborators',
    type: 'richText',
    editor: defaultLexical,
    label: 'Collaborators',
    defaultValue: () => JSON.parse(JSON.stringify(defaults.collaborators)),
  },
  {
    name: 'scope',
    type: 'richText',
    editor: defaultLexical,
    label: 'Scope',
    defaultValue: () => JSON.parse(JSON.stringify(defaults.scope)),
  },
  {
    name: 'features',
    type: 'richText',
    editor: defaultLexical,
    label: 'Features',
    defaultValue: () => JSON.parse(JSON.stringify(defaults.features)),
  },
  {
    name: 'testimonials',
    type: 'relationship',
    relationTo: 'testimonials',
    hasMany: true,
    defaultValue: () => JSON.parse(JSON.stringify(defaults.testimonials)),
  },
  {
    name: 'backgroundImage',
    type: 'upload',
    relationTo: 'media',
    defaultValue: defaults.backgroundImage,
  },
]
