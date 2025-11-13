import { cn } from '@/utilities/ui'
import * as React from 'react'

export const Width: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
    className?: string
    width?: number | string
  }
> = ({ children, className, width, ...props }) => {
  return (
    <div
      className={cn('flex flex-col', className)}
      style={{ maxWidth: width ? `${width}%` : undefined }}
      {...props}
    >
      {children}
    </div>
  )
}
