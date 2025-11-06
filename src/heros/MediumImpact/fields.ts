import { lexicalEditor, ParagraphFeature, UnorderedListFeature } from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

export const mediumImpactHeroFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
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
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [ParagraphFeature(), UnorderedListFeature()]
      },
    }),
    label: 'Description',
  },
  {
    name: 'collaborators',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [ParagraphFeature(), UnorderedListFeature()]
      },
    }),
    label: 'Collaborators',
  },
  {
    name: 'scope',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [ParagraphFeature(), UnorderedListFeature()]
      },
    }),
    label: 'Scope',
  },
  {
    name: 'features',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [ParagraphFeature(), UnorderedListFeature()]
      },
    }),
    label: 'Features',
  },
]

