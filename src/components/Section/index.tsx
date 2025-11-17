import React from 'react'
import { cn } from '@/utilities/ui'

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('md:my-48 my-[6rem]', className)}>{children}</div>
}

export default Section
