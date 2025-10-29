import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { Heading } from '@/components/Heading'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Frame } from '@/components/Frame'
import * as motion from 'motion/react-client'
import { slideInFromRightInView } from '@/utilities/animations'
import React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

export function DesktopCarousel({
  events,
  className,
}: {
  events: NonNullable<TimelineBlockProps['events']>
  className?: string
}) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: false,
      }}
      className={cn('mt-8', className)}
    >
      <CarouselContent>
        {events.map((event, index) => (
          <Event
            key={event.id}
            event={event}
            isFirst={index === 0}
            isLast={index === events.length - 1}
            index={index}
          />
        ))}
      </CarouselContent>

      {/* Navigation */}
      <CarouselPrevious data-theme="pizza" variant="default" />
      <CarouselNext data-theme="pizza" variant="default" />
    </Carousel>
  )
}

const Event: React.FC<{
  event: NonNullable<TimelineBlockProps['events']>[number]
  isFirst: boolean
  isLast: boolean
  index: number
}> = ({ event, isFirst, isLast, index }) => {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3 !pl-0" data-theme="sugar-shack">
      <motion.div
        {...slideInFromRightInView(index)}
        className="flex flex-col items-center text-center h-full"
      >
        {/* Image with internal padding formerly on the item */}
        <Frame
          resource={event.image}
          className="aspect-square w-full max-w-[13rem] overflow-hidden rounded-md"
          imgClassName="size-full object-cover"
        />

        {/* Timeline line */}
        <TimelineLine isFirst={isFirst} isLast={isLast} />

        <p className="type-h3 text-foreground mt-4">{event.year}</p>
        {event.description && (
          <p className="type-caption !font-normal text-foreground/75 mt-3 px-4">
            {event.description}
          </p>
        )}
      </motion.div>
    </CarouselItem>
  )
}

// Timeline line with central dot. The line is split into left and right halves so we can
// hide the left or right side (and corresponding arrow) for the first or last event.
const TimelineLine: React.FC<{ isFirst: boolean; isLast: boolean }> = ({ isFirst, isLast }) => {
  return (
    <div className="relative mt-11 mb-4 h-[3px] w-full flex items-center justify-center">
      {/* Left half of the line (hidden on first) */}
      {!isFirst && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-border" />
      )}

      {/* Right half of the line (shorter on last item) */}
      <span
        className={cn(
          'absolute left-1/2 top-1/2 -translate-y-1/2 h-full bg-border',
          isLast ? 'w-1/4' : 'w-1/2',
        )}
      />

      {/* Center dot */}
      <span className="relative z-10 block size-5 rounded-full bg-foreground" />

      {/* Right cap arrow for the last item only */}
      {isLast && (
        <ChevronRight
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-8 text-border"
          style={{ left: '74%' }}
        />
      )}
    </div>
  )
}
