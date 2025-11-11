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

export const studyHeroFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'heading',
    type: 'text',
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
  },
  {
    name: 'date',
    type: 'date',
    admin: {
      date: {
        pickerAppearance: 'dayOnly',
      },
    },
    required: true,
  },
  {
    name: 'location',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    type: 'richText',
    editor: defaultLexical,
    label: 'Description',
  },
  {
    name: 'collaborators',
    type: 'richText',
    editor: defaultLexical,
    label: 'Collaborators',
  },
  {
    name: 'scope',
    type: 'richText',
    editor: defaultLexical,
    label: 'Scope',
  },
  {
    name: 'features',
    type: 'richText',
    editor: defaultLexical,
    label: 'Features',
  },
  {
    name: 'testimonials',
    type: 'relationship',
    relationTo: 'testimonials',
    hasMany: true,
  },
]
