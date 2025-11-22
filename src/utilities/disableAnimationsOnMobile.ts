// Source - https://stackoverflow.com/a
// Posted by Qwadrox
// Retrieved 2025-11-22, License - CC BY-SA 4.0

import { MotionGlobalConfig } from 'motion/react'

export const disableAnimationsOnMobile = () => {
  if (typeof window === 'undefined') return

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (isMobile) {
    MotionGlobalConfig.skipAnimations = true
  }
}

