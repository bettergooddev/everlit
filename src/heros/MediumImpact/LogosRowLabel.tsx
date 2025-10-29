'use client'

import { useRowLabel } from '@payloadcms/ui'

export const LinksRowLabel = () => {
  const { rowNumber } = useRowLabel<{ rowNumber: number }>()

  const labels: Record<number, string> = {
    0: 'Primary',
    1: 'Secondary',
    2: 'Tertiary',
  }

  return <>{labels[rowNumber ?? 0]}</>
}
