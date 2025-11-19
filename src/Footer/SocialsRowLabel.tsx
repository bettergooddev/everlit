'use client'

import { useRowLabel } from '@payloadcms/ui'

interface SocialData {
  link?: {
    label?: string
  }
}

export const SocialsRowLabel = () => {
  const { data, rowNumber } = useRowLabel<SocialData>()

  const customLabel = data?.link?.label
    ? data.link.label
    : `Social ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}








