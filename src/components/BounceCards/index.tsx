'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { cn } from '@/utilities/ui'

interface BounceCardsProps {
  className?: string
  elements?: React.ReactNode[]
  //   containerWidth?: number
  //   containerHeight?: number
  animationDelay?: number
  animationStagger?: number
  animationDuration?: number
  easeType?: string
  transformStyles?: string[]
  enableHover?: boolean
  invertStackingOrder?: boolean
  cardClassName?: string
}

export default function BounceCards({
  className = '',
  elements = [],
  //   containerWidth = 400,
  //   containerHeight = 400,
  animationDelay = 0.4,
  animationStagger = 0.13,
  animationDuration = 0.7,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-200px)',
    'rotate(5deg) translate(-115px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(115px)',
    'rotate(2deg) translate(200px)',
  ],
  enableHover = true,
  invertStackingOrder = false,
  cardClassName = '',
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Observe visibility using the library hook
  const [observerRef, entry] = useIntersectionObserver({ threshold: 0.3 })

  // Merge the IntersectionObserver ref with our local ref so we can access the element later
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      observerRef(node)
    },
    [observerRef],
  )

  // Run the intro animation the first time the component becomes visible
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (hasAnimatedRef.current) return

    if (entry?.isIntersecting && containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.card'),
        { scale: 0 },
        {
          scale: 1,
          duration: animationDuration,
          stagger: { each: animationStagger, from: 'end' },
          ease: easeType,
          delay: animationDelay,
        },
      )

      hasAnimatedRef.current = true
    }
  }, [entry, animationDelay, animationStagger, easeType, animationDuration])

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
    } else if (transformStr === 'none') {
      return 'rotate(0deg)'
    } else {
      return `${transformStr} rotate(0deg)`
    }
  }

  const getPushedTransform = (baseTransform: string, offsetX: number): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/
    const match = baseTransform.match(translateRegex)
    if (match) {
      const currentX = parseFloat(match[1] as string)
      const newX = currentX + offsetX
      return baseTransform.replace(translateRegex, `translate(${newX}px)`)
    } else {
      return baseTransform === 'none'
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`
    }
  }

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover) return

    elements.forEach((_, i) => {
      const selector = `.card-${i}`
      gsap.killTweensOf(selector)

      const baseTransform = transformStyles[i] || 'none'

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform)
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        })
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160
        const pushedTransform = getPushedTransform(baseTransform, offsetX)

        const distance = Math.abs(hoveredIdx - i)
        const delay = distance * 0.05

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto',
        })
      }
    })
  }

  const resetSiblings = () => {
    if (!enableHover) return

    elements.forEach((_, i) => {
      const selector = `.card-${i}`
      gsap.killTweensOf(selector)

      const baseTransform = transformStyles[i] || 'none'
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      })
    })
  }

  return (
    <div
      ref={setRefs}
      className={`relative flex items-center justify-center h-32 ${className}`}
      //   style={{
      //     width: containerWidth,
      //     height: containerHeight,
      //   }}
    >
      {/* TODO: can this div become a slot? */}
      {elements.map((element, idx) => (
        <div
          key={idx}
          className={cn(`card card-${idx} absolute overflow-hidden`, cardClassName)}
          style={{
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transform: transformStyles[idx] || 'none',
            zIndex: invertStackingOrder ? elements.length - idx : idx,
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          {element}
        </div>
      ))}
    </div>
  )
}
