import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollTriggerRefresh() {
  const pathname = usePathname()

  useEffect(() => {
    // Refresh ScrollTrigger after route change
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [pathname])
}

