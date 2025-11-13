'use client'

import React, { useState, useEffect } from 'react'
import { NavigationNav } from './nav'
import type { Navigation as NavigationType } from '@/payload-types'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

interface NavigationClientProps {
  data: NavigationType
}

export const NavigationClient: React.FC<NavigationClientProps> = ({ data }) => {
  const pathname = usePathname()
  const isCaseStudy = pathname.includes('case-studies/')
  const isHome = pathname === '/'

  console.log(isHome)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Get initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showStickyNav = !isHome || scrollY > 50

  return (
    <>
      {isHome && <NavigationNav data={data} collapsed={false} isCaseStudy={isCaseStudy} />}
      <AnimatePresence>
        {showStickyNav && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed w-full top-8 z-50"
          >
            <NavigationNav data={data} collapsed={true} isCaseStudy={isCaseStudy} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavigationClient
