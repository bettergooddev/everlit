'use client'

import { useRowLabel } from '@payloadcms/ui'

interface LinkData {
  link?: {
    label?: string
  }
}

export const LinkRowLabel = () => {
  const { data, rowNumber } = useRowLabel<LinkData>()

  const customLabel = data?.link?.label
    ? `${data.link.label}`
    : `Link ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}
