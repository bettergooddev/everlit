'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { HeaderThemeProvider } from './HeaderTheme'
import { MotionConfigProvider } from './MotionConfig'
import { PageTransitionProvider } from './PageTransition'
import { PostHogProvider } from './PostHog'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const pathname = usePathname()

  // Reset scroll position and refresh ScrollTrigger after route changes
  useEffect(() => {
    window.scrollTo(0, 0)

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return (
    <PostHogProvider>
      <MotionConfigProvider>
        <PageTransitionProvider>
          <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </PageTransitionProvider>
      </MotionConfigProvider>
    </PostHogProvider>
  )
}
