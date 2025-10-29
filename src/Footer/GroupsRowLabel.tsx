'use client'

import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['groups']>[number]>()

  let label = `Group ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  if (data?.data?.heading) {
    label = data.data.heading
  }

  return <div>{label}</div>
}
