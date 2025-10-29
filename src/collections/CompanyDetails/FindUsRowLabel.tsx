'use client'

import { CompanyDetail } from '@/payload-types'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const { data, rowNumber: rowNumberRaw } =
    useRowLabel<NonNullable<CompanyDetail['findUs']>[number]>()

  const rowNumber = (rowNumberRaw || 0) + 1

  const customLabel = `${data.link?.label || `Find Us Item ${String(rowNumber).padStart(2, '0')}`}`

  return <div>{customLabel}</div>
}
