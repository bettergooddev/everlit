import { useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

interface UseTextRevealOptions {
  text: string | null | undefined
  start?: string
  end?: string
  initialOpacity?: number
  stagger?: number
  delay?: number
  ease?: string
}

export function useTextReveal<T extends HTMLElement = HTMLElement>({
  text,
  start = 'top 40%',
  end = 'top 20%',
  initialOpacity = 0.35,
  stagger = 0.015,
  delay = 0,
  ease = 'cubic.out',
}: UseTextRevealOptions): RefObject<T | null> {
  const textRef = useRef<T>(null)

  useGSAP(
    () => {
      if (!textRef.current || !text) return

      const split = new SplitText(textRef.current, {
        type: 'chars,words',
      })

      const chars = split.chars

      if (!chars || chars.length === 0) return

      // Set initial opacity
      gsap.set(chars, { opacity: initialOpacity })

      // Animate each letter based on scroll progress
      const scrollTrigger = ScrollTrigger.create({
        trigger: textRef.current,
        start,
        end,
        scrub: true,
        animation: gsap.to(chars, {
          opacity: 1,
          delay,
          stagger,
          ease,
        }),
      })

      // Cleanup function
      return () => {
        scrollTrigger?.kill()
        if (split) {
          split.revert()
        }
      }
    },
    { scope: textRef, dependencies: [text] },
  )

  return textRef
}
