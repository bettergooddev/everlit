'use client'

import { useRowLabel } from '@payloadcms/ui'

interface TagData {
  tag?: string
}

export const TagsRowLabel = () => {
  const { data, rowNumber } = useRowLabel<TagData>()

  const customLabel = data?.tag || `Tag ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}
