'use client'

import { forwardRef } from 'react'
import { motion } from 'motion/react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { cn } from '@/utilities/ui'

const ScrollIndicator = forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let currentElement: HTMLElement | null = e.currentTarget

    // Find the nearest parent section element
    while (currentElement && currentElement.tagName !== 'SECTION') {
      currentElement = currentElement.parentElement
    }

    if (currentElement) {
      // Get the next sibling element (should be the next section)
      const nextSibling = currentElement.nextElementSibling as HTMLElement | null

      if (nextSibling) {
        nextSibling.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative group cursor-pointer', className)}
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onClick={handleClick}
    >
      <div className="relative">
        <DotLottieReact
          src="https://lottie.host/54c3b337-f3f4-4414-8184-e51495f17bd3/tHWf3qGIWI.lottie"
          loop
          autoplay
          className="w-[11rem] h-[11rem] z-[1]"
        />
        <DotLottieReact
          src="https://lottie.host/54c3b337-f3f4-4414-8184-e51495f17bd3/tHWf3qGIWI.lottie"
          loop
          autoplay
          className="w-[11rem] h-[11rem] z-[0] absolute inset-0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </motion.div>
  )
})

ScrollIndicator.displayName = 'ScrollIndicator'

export { ScrollIndicator }
