import React from 'react'

import { Media } from '@/components/Media'
import type { Props } from '@/components/Media/types'
import { cn } from '@/utilities/ui'

export interface FrameProps extends Props {
  style?: React.CSSProperties
  inner?: boolean
}

export const Frame: React.FC<FrameProps> = ({
  inner = false,
  className,
  imgClassName,
  ...props
}) => {
  return (
    <Media
      {...props}
      imgClassName={cn(inner ? 'border-foreground-100/10 border drop-shadow-xl' : '', imgClassName)}
      className={cn(!inner ? 'border-foreground-100/10 border drop-shadow-xl' : '', className)}
    />
  )
}
