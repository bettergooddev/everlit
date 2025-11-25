'use client'

import React, { createContext, useCallback, use, useState } from 'react'

export interface ContextType {
  isTransitioning: boolean
  setTransitioning: (value: boolean) => void
}

const initialContext: ContextType = {
  isTransitioning: false,
  setTransitioning: () => null,
}

const PageTransitionContext = createContext(initialContext)

export const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isTransitioning, setTransitioningState] = useState<boolean>(false)

  const setTransitioning = useCallback((value: boolean) => {
    setTransitioningState(value)
  }, [])

  return (
    <PageTransitionContext value={{ isTransitioning, setTransitioning }}>
      {children}
    </PageTransitionContext>
  )
}

export const usePageTransition = (): ContextType => use(PageTransitionContext)


