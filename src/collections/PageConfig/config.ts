import { GlobalConfig } from 'payload'
import { revalidatePageConfig } from './hooks/revalidatePageConfig'

export const PageConfig: GlobalConfig = {
  slug: 'page-config',
  admin: {
    hidden: true,
  },
  hooks: {
    afterChange: [revalidatePageConfig],
  },
  versions: {
    drafts: false,
  },
  fields: [
    {
      name: 'pageSuffix',
      type: 'text',
      label: 'Page Suffix',
      required: false,
      admin: {
        description: {
          en: 'This will be added to the end of the page title. For example, "Rates | Page Suffix"',
        },
      },
    },
  ],
}
