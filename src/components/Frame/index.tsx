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
      imgClassName={cn(inner ? 'frame' : '', imgClassName)}
      className={cn(!inner ? 'frame' : '', className)}
    />
  )
}
