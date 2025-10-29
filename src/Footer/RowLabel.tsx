'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data =
    useRowLabel<NonNullable<NonNullable<Footer['groups']>[number]['linkGroups']>[number]>()

  let label = `Row ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  if (data?.data?.link?.label) {
    label = data.data.link.label
  }

  return <div>{label}</div>
}
