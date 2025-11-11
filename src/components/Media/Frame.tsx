import React from 'react'
import { cn } from '@/utilities/ui'
import type { Props as MediaProps } from './types'
import { Media } from './index'

export interface FrameProps extends MediaProps {
  additionalClassName?: string
  additionalImgClassName?: string
  additionalPictureClassName?: string
  additionalVideoClassName?: string
}

export const Frame: React.FC<FrameProps> = ({
  className,
  imgClassName,
  pictureClassName,
  videoClassName,
  additionalClassName,
  additionalImgClassName,
  additionalPictureClassName,
  additionalVideoClassName,
  ...rest
}) => {
  return (
    <Media
      {...rest}
      className={cn(className, additionalClassName)}
      imgClassName={cn(imgClassName, additionalImgClassName)}
      pictureClassName={cn(pictureClassName, additionalPictureClassName)}
      videoClassName={cn(videoClassName, additionalVideoClassName)}
    />
  )
}

