'use client'

import React, { useRef } from 'react'
import { NavLogo } from './logo'
import { renderNavigationItem } from './renderNavigationItem'
import type { Navigation as NavigationType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
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

interface NavigationClientProps {
  data: NavigationType
}
export const NavigationClient: React.FC<NavigationClientProps> = ({ data }) => {
  const navItems = (data?.navItems ?? []) as NonNullable<NavigationType['navItems']>
  const actions = (data?.actions ?? []) as NonNullable<NavigationType['actions']>
  const sheetCloseRef = useRef<HTMLButtonElement>(null)

  const handleNavItemClick = () => {
    sheetCloseRef.current?.click()
  }

  return (
    <header
      data-theme="sugar-shack"
      className="bg-background border-b border-primary/5 sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between py-[0.9rem]">
        {/* Logo – left aligned */}
        <div className="flex h-min">
          <NavLogo logo={data?.logo ?? null} />
        </div>

        {/* Primary navigation items – centered */}
        <nav className="flex-1 items-center justify-center gap-6 hidden lg:flex">
          {navItems.map((item, index) =>
            renderNavigationItem(item, index, { appearance: 'inline' }),
          )}
        </nav>

        {/* Actions – right aligned */}
        <div className="items-center gap-6 hidden lg:flex" data-theme="cafe">
          {actions.map((item, index) => renderNavigationItem(item, `action-${index}`))}
        </div>

        {/* Mobile navigation – visible on small screens */}
        <div className="flex items-center lg:hidden" data-theme="cafe">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="p-6 space-y-6" data-theme="cafe" hideClose>
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
    </header>
  )
}

export default NavigationClient
