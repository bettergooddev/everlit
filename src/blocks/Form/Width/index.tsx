import { cn } from '@/utilities/ui'
import * as React from 'react'

export const Width: React.FC<
  {
    children: React.ReactNode
    className?: string
    width?: number | string
  } & React.HTMLAttributes<HTMLDivElement>
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
