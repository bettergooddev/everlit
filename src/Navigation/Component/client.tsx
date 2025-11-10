'use client'

import React, { useEffect, useRef, useState } from 'react'
import { NavLogo } from './logo'
import { renderNavigationItem } from './renderNavigationItem'
import type { Navigation as NavigationType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { X } from 'lucide-react'
import { renderMobileNavigationItem } from './renderMobileNavigationItem'
import { useWindowScroll } from '@uidotdev/usehooks'
import { tv } from 'tailwind-variants'
import { cn } from '@/utilities/ui'
import { AnimatePresence, motion } from 'motion/react'
import NavButton from './navButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationClientProps {
  data: NavigationType
}

const classes = {
  header: tv({
    base: 'transition-opacity duration-150',
    variants: {
      hasScroll: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
      collapsed: {
        true: 'top-4 container', //moved from inner
        false: 'top-0 container-full', //moved from inner
      },
    },
  }),
  inner: tv({
    base: '',
    variants: {
      collapsed: {
        true: '',
        false: '',
      },
    },
  }),
  visible: tv({
    base: '',
    variants: {
      collapsed: {
        true: 'opacity-100',
        false: 'opacity-0 ',
      },
    },
  }),
}

export const NavigationClient: React.FC<NavigationClientProps> = ({ data }) => {
  const pathname = usePathname()
  const isCaseStudy = pathname.includes('case-studies/')

  const [{ y }] = useWindowScroll()

  const [hasScroll, setHasScroll] = useState<boolean>(false)
  const [collapsed, setCollapsed] = useState<boolean>(false)

  useEffect(() => {
    if (y === null) setHasScroll(false)
    else setHasScroll(true)

    if (y && y > 50) setCollapsed(true)
    else setCollapsed(false)
  }, [y])

  const navItems = (data?.navItems ?? []) as NonNullable<NavigationType['navItems']>
  const actions = (data?.actions ?? []) as NonNullable<NavigationType['actions']>
  const sheetCloseRef = useRef<HTMLButtonElement>(null)

  const handleNavItemClick = () => {
    sheetCloseRef.current?.click()
  }

  // Transition when collapsing (false -> true)
  const collapseTransition = {
    ease: 'easeOut' as const,
    duration: 0.2,
    bounce: 1,
  }

  // Transition when expanding (true -> false)
  const expandTransition = {
    ease: 'easeInOut' as const,
    duration: 0.3,
    bounce: 0.8,
  }

  // Use different transition based on direction
  const transition = collapsed ? collapseTransition : expandTransition

  return (
    <motion.nav
      className={cn('fixed top-0 left-0 right-0 z-50', classes.header({ hasScroll, collapsed }))}
      transition={transition}
    >
      <AnimatePresence>
        <motion.div
          layout="position"
          transition={transition}
          className={cn(
            'flex mx-auto p-[0.9rem] items-center justify-between w-full relative',
            classes.inner({ collapsed }),
          )}
        >
          <AnimatePresence>
            <motion.div
              layout
              transition={transition}
              className={cn(
                'absolute inset-0 w-full pointer-events-none transition-opacity duration-300 bg-white/14 rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.3px] border border-white/15 z-[-1]',
                classes.visible({ collapsed }),
              )}
            ></motion.div>
          </AnimatePresence>

          {/* Logo – left aligned */}
          <div className="flex h-min mr-12 gap-4">
            {isCaseStudy && (
              <Link href={'/home#case-studies'}>
                <Button variant={'secondary'}>
                  <ArrowLeft />
                  Back Home
                </Button>
              </Link>
            )}

            <NavLogo logo={data?.logo ?? null} />
          </div>

          {/* Actions – right aligned */}
          <motion.div
            className="items-center gap-6 hidden lg:flex"
            layout="position"
            transition={transition}
          >
            <div className="flex-1 justify-end gap-6 hidden lg:flex">
              {/* Primary navigation items – centered */}
              {navItems.map((item, index) =>
                renderNavigationItem(item, index, { appearance: 'inline' }),
              )}
            </div>
            {/* {actions.map((item, index) => renderNavigationItem(item, `action-${index}`))} */}

            <NavButton />
          </motion.div>

          {/* Mobile navigation – visible on small screens */}
          <div className="flex items-center lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="p-6 space-y-6" hideClose>
                <div className="flex items-center justify-between mb-4">
                  <NavLogo logo={data?.logo ?? null} />
                  <SheetClose asChild>
                    <Button variant="default" size="icon" aria-label="Close menu">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                </SheetHeader>
                {/* Primary navigation items */}
                <nav className="flex flex-col gap-4 w-full">
                  {navItems.map((item, index) =>
                    renderMobileNavigationItem(item, index, {
                      appearance: 'inline',
                      onItemClick: handleNavItemClick,
                    }),
                  )}
                </nav>

                {/* Divider */}
                <div className="border-t border-border pt-4" />

                {/* Actions */}
                <div className="flex flex-col gap-4">
                  {actions.map((item, index) =>
                    renderMobileNavigationItem(item, `action-mobile-${index}`, {
                      onItemClick: handleNavItemClick,
                    }),
                  )}
                </div>

                {/* Hidden close button for programmatic closing */}
                <SheetClose ref={sheetCloseRef} className="hidden" />
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.nav>
  )
}

export default NavigationClient
