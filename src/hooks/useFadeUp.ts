import { useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface UseFadeUpOptions {
  triggerRef?: RefObject<HTMLElement | null>
  start?: string
  end?: string
  initialY?: number
  duration?: number
  delay?: number
  ease?: string
  once?: boolean
}

export function useFadeUp<T extends HTMLElement = HTMLElement>({
  triggerRef,
  start = 'top 80%',
  end = 'top 50%',
  initialY = 20,
  duration = 0.6,
  delay = 0,
  ease = 'power2.out',
  once = true,
}: UseFadeUpOptions = {}): RefObject<T | null> {
  const elementRef = useRef<T>(null)

  useGSAP(
    () => {
      if (!elementRef.current) return

      const trigger = triggerRef?.current ?? elementRef.current

      // Set initial state - faded and moved up
      gsap.set(elementRef.current, {
        opacity: 0,
        y: initialY,
      })

      // Animate on scroll - fade in and move to position
      const scrollTrigger = ScrollTrigger.create({
        trigger,
        start,
        end,
        once,
        scrub: !once,
        animation: gsap.to(elementRef.current, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease,
        }),
      })

      // Cleanup function
      return () => {
        scrollTrigger?.kill()
      }
    },
    { scope: elementRef },
  )

  return elementRef
}
