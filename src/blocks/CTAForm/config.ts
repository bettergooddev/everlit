import type { Block } from 'payload'

import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
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
    {
      name: 'dedicatedPage',
      type: 'checkbox',
      label: 'Dedicated Page',
      defaultValue: false,
    },
    {
      ...link({
        appearances: false,
        overrides: {
          name: 'phone',
          label: 'Phone',
          required: true,
          defaultValue: defaults.phone,
          admin: {
            condition: (_, siblingData) => siblingData?.dedicatedPage === true,
          },
        },
      }),
    },
    {
      ...link({
        appearances: false,
        overrides: {
          name: 'email',
          label: 'Email',
          required: true,
          defaultValue: defaults.email,
          admin: {
            condition: (_, siblingData) => siblingData?.dedicatedPage === true,
          },
        },
      }),
    },
    {
      ...link({
        appearances: false,
        overrides: {
          name: 'address',
          label: 'Address',
          required: true,
          defaultValue: defaults.address,
          admin: {
            condition: (_, siblingData) => siblingData?.dedicatedPage === true,
          },
        },
      }),
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
