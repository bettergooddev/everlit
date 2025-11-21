import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<
  {
    ref?: React.Ref<HTMLTextAreaElement>
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, ...props }) => {
  return (
    <div className={cn('relative group bg-transparent flex', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-background-500/40 to-background-500/20 rounded-xs pointer-events-none transition-opacity duration-200 group-hover:opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-background-500/60 to-background-500/40 rounded-xs pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
      <textarea
        className={cn(
          'relative flex min-h-[80px] w-full rounded-xs bg-transparent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-foreground-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        )}
        ref={ref}
        {...props}
      />
      <div className="absolute inset-0 border-[1px] border-foreground-100/10 rounded-xs pointer-events-none" />
    </div>
  )
}

export { Textarea }
