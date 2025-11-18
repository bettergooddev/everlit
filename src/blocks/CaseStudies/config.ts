import type { Block } from 'payload'

import { defaults } from './defaults'

export const CaseStudies: Block = {
  slug: 'case-studies',
  interfaceName: 'CaseStudiesBlock',
  imageURL: '/api/media/file/thumbnail-case-study.png',
  labels: {
    plural: 'Case Studies',
    singular: 'Case Study',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
      defaultValue: defaults.heading,
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
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      required: true,
      defaultValue: defaults.caseStudies,
    },
  ],
}
