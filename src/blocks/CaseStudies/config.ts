import type { Block } from 'payload'

export const CaseStudies: Block = {
  slug: 'case-studies',
  interfaceName: 'CaseStudiesBlock',
  labels: {
    plural: 'Case Studies',
    singular: 'Case Study',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      required: true,
    },
  ],
}
