'use client'

import { usePayloadAPI, useRowLabel } from '@payloadcms/ui'

interface HourData {
  brand?: string
}

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<HourData>()

  const [{ data: brandData, isError, isLoading }, { setParams }] = usePayloadAPI(
    `/api/brands/${data?.brand}`,
    {
      initialParams: { depth: 1 },
    },
  )

  const customLabel = brandData?.name || `Hour ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <>{customLabel}</>
}
