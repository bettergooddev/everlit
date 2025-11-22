import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { PageTransitionProvider } from './PageTransition'
import { PostHogProvider } from './PostHog'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <PostHogProvider>
      <PageTransitionProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </PageTransitionProvider>
    </PostHogProvider>
  )
}
