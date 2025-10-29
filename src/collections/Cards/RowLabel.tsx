'use client'

import { useRowLabel } from '@payloadcms/ui'

interface CardData {
  name?: string
}

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<CardData>()

  const customLabel = data?.name || `Card ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}
