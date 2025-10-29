'use client'

import { FeaturesBlock } from '@/payload-types'
import { useRowLabel } from '@payloadcms/ui'

export const HighlightsRowLabel = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<FeaturesBlock['highlights']>[number]>()

  const customLabel = data?.heading || `Highlight ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}
