'use client'

import { useRowLabel } from '@payloadcms/ui'

interface EventData {
  year?: number
}

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<EventData>()

  const customLabel = data?.year
    ? `${data.year}`
    : `Event ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}
