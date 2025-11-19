'use client'

// TODO: Create 2 navbars, one thats only on the homepage and is flush with the top of the page, and then the glass contained one, and have it pop out when you scroll down.

import React, { useEffect, useRef } from 'react'
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
import { tv } from 'tailwind-variants'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useElementSize } from '@mantine/hooks'

interface NavigationNavProps {
  data: NavigationType
  collapsed?: boolean
  className?: string
  isCaseStudy?: boolean
}

const classes = {
  header: tv({
    base: '',
    variants: {
      collapsed: {
        true: 'top-4 container',
        false: 'top-0 container-full',
      },
    },
  }),
  visible: tv({
    base: '',
    variants: {
      collapsed: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
  }),
}

export const NavigationNav: React.FC<NavigationNavProps> = ({
  data,
  collapsed = false,
  className,
  isCaseStudy = false,
}) => {
  const navItems = (data?.navItems ?? []) as NonNullable<NavigationType['navItems']>
  const actions = (data?.actions ?? []) as NonNullable<NavigationType['actions']>
  const sheetCloseRef = useRef<HTMLButtonElement>(null)

  const handleNavItemClick = () => {
    sheetCloseRef.current?.click()
  }

  const { ref: buttonRef, width: buttonWidth } = useElementSize()

  return (
    <nav className={cn('left-0 right-0 z-50', classes.header({ collapsed }), className)}>
      <div
        className={cn(
          'flex mx-auto p-[0.9rem] items-center justify-between w-full relative overflow-hidden',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 w-full pointer-events-none bg-white/14 rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[10.3px] border border-foreground-100/10 z-[-1]',
            classes.visible({ collapsed }),
          )}
        ></div>
        {/* Logo – left aligned */}
        <motion.div
          className="flex h-min mr-12"
          initial={{
            x: -(buttonWidth || 0),
          }}
          animate={{
            x: isCaseStudy ? 0 : -(buttonWidth || 0),
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {collapsed && (
            <div ref={buttonRef}>
              <Link href={'/home#case-studies'} className="mr-4">
                <Button variant={'secondary'}>
                  <ArrowLeft />
                  Back Home
                </Button>
              </Link>
            </div>
          )}
          <NavLogo logo={data?.logo ?? null} />
        </motion.div>
        {/* Actions – right aligned */}
        <div className="items-center gap-6 hidden lg:flex">
          <div className="flex-1 justify-end gap-6 hidden lg:flex">
            {/* Primary navigation items – centered */}
            {navItems.map((item, index) =>
              renderNavigationItem(item, index, { appearance: 'inline' }),
            )}
          </div>
          {actions.map((item, index) => renderNavigationItem(item, `action-${index}`))}
        </div>
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
      </div>
    </nav>
  )
}

export default NavigationNav
