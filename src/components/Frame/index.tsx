import React from 'react'

import { Media } from '@/components/Media'
import type { Props } from '@/components/Media/types'
import { cn } from '@/utilities/ui'

export interface FrameProps extends Props {
  style?: React.CSSProperties
}

export const Frame: React.FC<FrameProps> = ({ className, ...props }) => {
  return <Media {...props} className={cn('border-background-100 border', className)} />
}
