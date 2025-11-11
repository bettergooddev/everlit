'use client'

import { useRowLabel } from '@payloadcms/ui'

interface LinkGroupData {
  link?: {
    label?: string
  }
}

export const LinkGroupRowLabel = () => {
  const { data, rowNumber } = useRowLabel<LinkGroupData>()

  const customLabel = data?.link?.label || `Link ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}



