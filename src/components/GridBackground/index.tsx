'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

interface GridBackgroundProps {
  className?: string
  children?: React.ReactNode
  showRadialGradient?: boolean
}

export function GridBackground({
  className,
  children,
  showRadialGradient = true,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center bg-background',
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:50px_50px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
        )}
      />
      {showRadialGradient && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_-50%,black)]"></div>
      )}
      {children && <div className="relative z-20">{children}</div>}
    </div>
  )
}

