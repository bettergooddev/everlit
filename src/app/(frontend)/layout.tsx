import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Navigation } from '@/Navigation/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { calvino, figtree } from '@/fonts/fonts'
import { ViewTransitions } from 'next-view-transitions'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import Script from 'next/script'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <ViewTransitions>
      <html
        className={cn(calvino.variable, figtree.variable)}
        lang="en"
        suppressHydrationWarning
        data-theme="dark"
      >
        <head>
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          <meta name="apple-mobile-web-app-title" content="Everlit" />

          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="beforeInteractive"
          />
        </head>

        <body className="relative">
          <Providers>
            {/* <AdminBar
              adminBarProps={{
                preview: isEnabled,
                }}
                /> */}

            <Navigation />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
