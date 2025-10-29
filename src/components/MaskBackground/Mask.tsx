import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '../Media'

interface MaskProps {
  media: MediaType & { fullUrl: string }
  className?: string
  shadow?: boolean
}

export function Mask(props: MaskProps) {
  const { shadow = true } = props
  return shadow ? (
    <Shadow {...props}>
      <Inner {...props} />
    </Shadow>
  ) : (
    <Inner {...props} />
  )
}

function Inner({ media, className = '' }: MaskProps) {
  return (
    <div
      className={`w-full h-auto ${className}`}
      style={{
        maskImage: `url(${media.fullUrl})`,
        maskSize: 'cover',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        aspectRatio: (media?.width || 1) / (media?.height || 1),
      }}
    ></div>
  )
}

function Shadow({ media, children }: MaskProps & { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <Media
        resource={media}
        className="absolute -z-[1] size-full object-cover -translate-y-full blur-[8px] opacity-75 mix-blend-darken"
        imgClassName=""
      />
    </div>
  )
}
