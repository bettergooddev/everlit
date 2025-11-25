import { useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface UseFadeUpStaggerOptions {
  triggerRef?: RefObject<HTMLElement | null>
  start?: string
  end?: string
  initialY?: number
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
  once?: boolean
}

export function useFadeUpStagger<T extends HTMLElement = HTMLElement>({
  triggerRef,
  start = 'top 80%',
  end = 'top 50%',
  initialY = 20,
  duration = 0.6,
  delay = 0,
  stagger = 0.1,
  ease = 'power2.out',
  once = true,
}: UseFadeUpStaggerOptions = {}): RefObject<T | null> {
  const elementRef = useRef<T>(null)

  useGSAP(
    () => {
      if (!elementRef.current) return

      const trigger = triggerRef?.current ?? elementRef.current
      const children = Array.from(elementRef.current.children) as HTMLElement[]

      if (children.length === 0) return

      // Set initial state - faded and moved up
      gsap.set(children, {
        opacity: 0,
        y: initialY,
      })

      // Animate children on scroll - fade in and move to position with stagger
      const scrollTrigger = ScrollTrigger.create({
        trigger,
        start,
        end,
        once,
        scrub: !once,
        animation: gsap.to(children, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
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
