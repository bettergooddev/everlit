import { useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

interface UseBlurEntranceOptions {
  text: string | null | undefined
  triggerRef?: RefObject<HTMLElement | null>
  start?: string
  end?: string
  initialBlur?: number
  stagger?: number
  delay?: number
  duration?: number
  ease?: string
  once?: boolean
}

export function useBlurEntrance<T extends HTMLElement = HTMLElement>({
  text,
  triggerRef,
  start = 'top 80%',
  end = 'top 50%',
  initialBlur = 10,
  stagger = 0.08,
  delay = 0,
  duration = 0.8,
  ease = 'power2.out',
  once = true,
}: UseBlurEntranceOptions): RefObject<T | null> {
  const textRef = useRef<T>(null)

  useGSAP(
    () => {
      if (!textRef.current || !text) return

      const trigger = triggerRef?.current ?? textRef.current

      const split = new SplitText(textRef.current, {
        type: 'words',
      })

      const words = split.words

      if (!words || words.length === 0) return

      // Set initial state - blurred and faded
      gsap.set(words, {
        opacity: 0,
        filter: `blur(${initialBlur}px)`,
      })

      // Animate words on scroll - unblur and fade in
      const scrollTrigger = ScrollTrigger.create({
        trigger,
        start,
        end,
        once,
        scrub: !once,
        animation: gsap.to(words, {
          opacity: 1,
          filter: 'blur(0px)',
          duration,
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
