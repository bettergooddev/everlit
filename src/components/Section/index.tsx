import React from 'react'
import { cn } from '@/utilities/ui'

const Section = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; id?: string }
>(({ children, className, id }, ref) => {
  return (
    <div ref={ref} id={id} className={cn('md:my-24 my-36', className)}>
      {children}
    </div>
  )
})

Section.displayName = 'Section'

export default Section
