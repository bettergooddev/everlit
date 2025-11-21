import * as React from 'react'

import { cn } from '@/utilities/ui'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className={cn('relative group', className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-background-500/40 to-background-500/20 rounded-xs pointer-events-none transition-opacity duration-200 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-background-500/60 to-background-500/40 rounded-xs pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
        <input
          type={type}
          className={cn(
            'relative flex h-10 w-full rounded-xs bg-transparent px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground-100 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-0 border-[1px] border-foreground-100/10 rounded-xs pointer-events-none" />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
