import { cn } from '@/utilities/ui'
import React from 'react'

interface MapProps {
  src?: string
  width?: number | string
  height?: number | string
  className?: string
  allowFullScreen?: boolean
  loading?: 'lazy' | 'eager'
  referrerPolicy?:
    | 'no-referrer-when-downgrade'
    | 'no-referrer'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
}

const Map: React.FC<MapProps> = ({
  src = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED || '',
  width = 600,
  height = 450,
  className = '',
  allowFullScreen = false,
  loading = 'lazy',
  referrerPolicy = 'no-referrer-when-downgrade',
}) => {
  return (
    <div className={cn('size-full', className)}>
      <iframe
        src={src}
        width={width}
        height={height}
        allowFullScreen={allowFullScreen}
        loading={loading}
        referrerPolicy={referrerPolicy}
        title="My-Chosen Café Location"
        className="size-full h-full border-none"
      />
    </div>
  )
}

export default Map
