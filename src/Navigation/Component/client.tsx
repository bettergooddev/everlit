'use client'

import React, { useState, useEffect, useRef } from 'react'
import { NavigationNav } from './nav'
import type { Navigation as NavigationType } from '@/payload-types'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

interface NavigationClientProps {
  data: NavigationType
}

export const NavigationClient: React.FC<NavigationClientProps> = ({ data }) => {
  const pathname = usePathname()
  const isCaseStudy = pathname.includes('case-studies/')
  const isHome = pathname === '/'

  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction
      if (currentScrollY > lastScrollYRef.current) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollYRef.current) {
        setScrollDirection('up')
      }

      setScrollY(currentScrollY)
      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Get initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showStickyNav = !isHome || (scrollDirection === 'down' ? scrollY > 50 : scrollY > 500)

  return (
    <>
      {isHome && <NavigationNav data={data} collapsed={false} isCaseStudy={isCaseStudy} />}
      <motion.div
        initial={{ y: -125 }}
        animate={showStickyNav ? { y: 0 } : { y: -125 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed w-full top-8 z-50"
        style={{ pointerEvents: showStickyNav ? 'auto' : 'none' }}
      >
        <NavigationNav data={data} collapsed={true} isCaseStudy={isCaseStudy} />
      </motion.div>
    </>
  )
}

export default NavigationClient
