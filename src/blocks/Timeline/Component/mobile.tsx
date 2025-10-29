'use client'

import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { Frame } from '@/components/Frame'
import { cn } from '@/utilities/ui'
import React from 'react'
import { ChevronDown } from 'lucide-react'

export function MobileTimeline({
  events,
  className,
}: {
  events: NonNullable<TimelineBlockProps['events']>
  className?: string
}) {
  return (
    <div className={cn('mt-8 relative', className)} data-theme="sugar-shack">
      {/* Vertical line running through items */}
      <span
        className="pointer-events-none absolute left-4 top-4 bottom-7 w-0.5 bg-border"
        aria-hidden="true"
      />

      {/* Chevron at bottom of the vertical line */}
      <ChevronDown
        className="absolute left-[17px] -translate-x-1/2 bottom-0 size-7 text-border"
        strokeWidth={2}
        style={{ bottom: '16px' }}
        aria-hidden="true"
      />

      <ul className="space-y-20">
        {events.map((event, index) => (
          <li key={event.id} className="relative pl-12 flex flex-col items-start">
            {/* Dot on the vertical line */}
            <span className="absolute left-4 -translate-x-1/2 top-2.5 block size-4 rounded-full bg-foreground" />

            {/* Event image */}
            <Frame
              resource={event.image}
              className="aspect-square w-full max-w-[10rem] overflow-hidden rounded-md"
              imgClassName="size-full object-cover"
            />

            <p className="type-h3 text-foreground mt-4">{event.year}</p>
            {event.description && (
              <p className="type-caption !font-normal text-foreground/75 mt-2 pr-2 max-w-[48ch]">
                {event.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
