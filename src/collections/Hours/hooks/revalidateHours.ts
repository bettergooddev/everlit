import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateHours: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating hours and all pages`)

    // Revalidate the global hours tag
    revalidateTag('global_hours')

    // Fetch all published pages and revalidate each one
    try {
      const pages = await payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
        },
      })

      // Revalidate each published page
      pages.docs?.forEach((page) => {
        if (page.slug) {
          const path = page.slug === 'home' ? '/' : `/${page.slug}`
          payload.logger.info(`Revalidating page at path: ${path}`)
          revalidatePath(path)
        }
      })

      payload.logger.info(`Revalidated ${pages.docs?.length || 0} pages`)
    } catch (error) {
      payload.logger.error(`Failed to revalidate pages: ${error}`)
    }
  }

  return doc
}
