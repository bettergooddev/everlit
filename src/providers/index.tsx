import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { PostHogProvider } from './PostHog'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <PostHogProvider>
      <HeaderThemeProvider>{children}</HeaderThemeProvider>
    </PostHogProvider>
  )
}
