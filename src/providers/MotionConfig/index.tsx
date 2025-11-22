'use client'

import React, { useEffect } from 'react'
import { disableAnimationsOnMobile } from '@/utilities/disableAnimationsOnMobile'

export const MotionConfigProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  useEffect(() => {
    disableAnimationsOnMobile()
  }, [])

  return <>{children}</>
}

