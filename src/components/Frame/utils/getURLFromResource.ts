import type { Media as MediaType } from '@/payload-types'

export type MediaResource = MediaType | string | number | null | undefined

export const getURLFromResource = (resource: MediaResource): string | null => {
  if (typeof resource === 'object' && resource !== null) {
    return (resource as MediaType).url ?? null
  }
  if (typeof resource === 'string') return resource
  return null
}
