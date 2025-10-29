import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { Heading } from '@/components/Heading'
import React from 'react'
import { DesktopCarousel } from './desktop'
import { MobileTimeline } from './mobile'

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ heading, subheading, events }) => {
  if (!events || events.length === 0) return null

  return (
    <div className="container">
      <Heading heading={heading} subheading={subheading} />

      {/* Mobile (vertical list) */}
      <MobileTimeline events={events} className="md:hidden" />

      {/* Desktop (carousel) */}
      <DesktopCarousel events={events} className="hidden md:block" />
    </div>
  )
}
