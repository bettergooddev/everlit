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
import { Link } from '@/components/ui/link'
import { AnimatePresence, motion } from 'motion/react'
import { useElementSize } from '@mantine/hooks'

interface NavigationNavProps {
  data: NavigationType
  collapsed?: boolean
  className?: string
  isCaseStudy?: boolean
  navButtonCalculated: boolean
  setNavButtonCalculated: (value: boolean) => void
}

const classes = {
  header: tv({
    base: '',
    variants: {
      collapsed: {
        true: 'top-4 container',
        false: 'top-0 container lg:w-full lg:max-w-full lg:px-[2rem] absolute',
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
  navButtonCalculated,
  setNavButtonCalculated,
}) => {
  const navItems = (data?.navItems ?? []) as NonNullable<NavigationType['navItems']>
  const actions = (data?.actions ?? []) as NonNullable<NavigationType['actions']>
  const sheetCloseRef = useRef<HTMLButtonElement>(null)

  const handleNavItemClick = () => {
    sheetCloseRef.current?.click()
  }

  const { ref: buttonRef, width: buttonWidth } = useElementSize()

  useEffect(() => {
    if (!collapsed) {
      setNavButtonCalculated(true)
    } else if (buttonWidth > 0 && !navButtonCalculated) {
      const timer = setTimeout(() => {
        setNavButtonCalculated(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [buttonWidth, navButtonCalculated, collapsed, setNavButtonCalculated])

  return (
    <nav className={cn('left-0 right-0 z-50', classes.header({ collapsed }), className)}>
      <div
        className={cn(
          'flex mx-auto items-center justify-between w-full relative overflow-hidden',
          collapsed ? 'p-[0.9rem]' : 'py-[0.9rem]',
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
          className="flex h-min mr-4 md:mr-12"
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
              <Link href={'/#case-studies'} className="mr-4">
                <Button variant={'secondary'}>
                  <ArrowLeft />
                  <span className="hidden md:inline">Back Home</span>
                  <span className="inline md:hidden">Back</span>
                </Button>
              </Link>
            </div>
          )}
          <NavLogo logo={data?.logo ?? null} />
        </motion.div>
        {/* Actions – right aligned */}
        <div className="items-center gap-12 hidden lg:flex">
          <div className="flex-1 justify-end gap-14 hidden lg:flex">
            {/* Primary navigation items – centered */}
            {navItems.map((item, index) =>
              renderNavigationItem(item, index, { appearance: 'link' }),
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

            <SheetContent
              side="right"
              className=" flex space-y-6 w-full bg-transparent border-none "
              hideClose
            >
              <div className="rounded-xs  size-full relative p-6 overflow-hidden z-100">
                <div className="absolute inset-0 border-[1px] border-foreground-100/10 bg-foreground-100/10 pointer-events-none" />

                <div className="absolute inset-0 z-[-2] pointer-events-none" />

                <div className="flex items-center justify-end mb-8">
                  {/* <NavLogo logo={data?.logo ?? null} /> */}
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
                <nav className="flex flex-col gap-6 w-full">
                  {navItems.map((item, index) =>
                    renderMobileNavigationItem(item, index, {
                      appearance: 'outline',
                      onItemClick: handleNavItemClick,
                    }),
                  )}
                </nav>

                {/* Divider */}
                {/* <div className="border-t border-border pt-4" /> */}

                {/* Actions */}
                <div className="flex flex-col gap-4 mt-6">
                  {actions.map((item, index) =>
                    renderMobileNavigationItem(item, `action-mobile-${index}`, {
                      onItemClick: handleNavItemClick,
                    }),
                  )}
                </div>

                {/* Hidden close button for programmatic closing */}
                <SheetClose ref={sheetCloseRef} className="hidden" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

export default NavigationNav
