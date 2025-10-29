'use client'
import React, { useEffect, useState } from 'react'
import { ArrayField } from '@payloadcms/ui'
import type { ArrayFieldClientComponent } from 'payload'

export const Field: ArrayFieldClientComponent = (props) => {
  const [, setForceUpdate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <ArrayField {...props} />
}
