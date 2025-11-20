'use client'

import { useRowLabel } from '@payloadcms/ui'

interface BulletData {
  bullet?: string
}

export const BulletsRowLabel = () => {
  const { data, rowNumber } = useRowLabel<BulletData>()

  const customLabel = data?.bullet || `Bullet ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}






