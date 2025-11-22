import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { MotionConfigProvider } from './MotionConfig'
import { PageTransitionProvider } from './PageTransition'
import { PostHogProvider } from './PostHog'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
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
