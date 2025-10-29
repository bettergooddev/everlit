import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'
import { DataFromGlobalSlug } from 'payload'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const pageConfig = (await getCachedGlobal(
    'page-config',
    3,
  )()) as DataFromGlobalSlug<'page-config'>

  const titleText = doc?.meta?.title || doc?.title || `${process.env.NEXT_PUBLIC_COMPANY_NAME} PAGE`
  const ignoreSuffix = (doc?.meta && 'ignoreSuffix' in doc.meta && doc.meta.ignoreSuffix) ?? false
  const pageSuffix = ignoreSuffix ? '' : (pageConfig?.pageSuffix ?? '')
  const pageTitle = pageSuffix ? titleText + ' | ' + pageSuffix : titleText

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: pageTitle,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title: pageTitle,
  }
}
