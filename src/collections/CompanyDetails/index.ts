import type { GlobalConfig } from 'payload'
import { iconLink } from '@/fields/iconLink'

export const CompanyDetails: GlobalConfig = {
  slug: 'companyDetails',
  label: {
    singular: 'Call to Action',
    plural: 'Call to Actions',
  },
  fields: [
    {
      name: 'findUs',
      type: 'array',
      label: 'Find Us',
      fields: iconLink,
      admin: {
        components: {
          RowLabel: '@/collections/CompanyDetails/FindUsRowLabel#RowLabel',
          Field: '@/collections/CompanyDetails/Field#Field',
        },
      },
    },
    // {
    //   name: 'socials',
    //   type: 'array',
    //   label: 'Socials',
    //   fields: iconLink,
    //   admin: {
    //     components: {
    //       RowLabel: '@/collections/CompanyDetails/SocialsRowLabel#RowLabel',
    //       Field: '@/collections/CompanyDetails/Field#Field',
    //     },
    //   },
    // },
    {
      name: 'location',
      type: 'group',
      label: 'Location',
      fields: [
        {
          name: 'googleMapsEmbedUrl',
          type: 'text',
          label: 'Google Maps Embed URL',
          admin: {
            description:
              'Paste the embed URL from Google Maps (e.g., https://www.google.com/maps/embed?pb=...)',
            placeholder: 'https://www.google.com/maps/embed?pb=...',
          },
        },
      ],
    },
  ],
}
