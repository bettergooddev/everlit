'use client'

import { useRowLabel } from '@payloadcms/ui'

export const LogosRowLabel = () => {
  const { rowNumber } = useRowLabel<{ rowNumber: number }>()

  const labels: Record<number, string> = {
    0: 'Left',
    1: 'Center',
    2: 'Right',
  }

  return <>{labels[rowNumber ?? 0]}</>
}
