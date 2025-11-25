import { useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface UseFadeInOptions {
  triggerRef?: RefObject<HTMLElement | null>
  start?: string
  end?: string
  stagger?: number
  ease?: string
  once?: boolean
}

export function useFadeIn<T extends HTMLElement = HTMLElement>({
  triggerRef,
  start = 'top 80%',
  end = 'top 50%',
  stagger = 0.1,
  ease = 'power2.out',
  once = true,
}: UseFadeInOptions = {}): RefObject<T | null> {
  const elementRef = useRef<T>(null)

  useGSAP(
    () => {
      if (!elementRef.current) return

      const trigger = triggerRef?.current ?? elementRef.current
      const children = Array.from(elementRef.current.children) as HTMLElement[]

      if (children.length === 0) return

      // Set initial state - faded out
      gsap.set(children, {
        opacity: 0,
      })

      // Animate children on scroll - fade in
      const scrollTrigger = ScrollTrigger.create({
        trigger,
        start,
        end,
        once,
        scrub: !once,
        animation: gsap.to(children, {
          opacity: 1,
          duration: 0.6,
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
