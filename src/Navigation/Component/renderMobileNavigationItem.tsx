import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import type { Navigation as NavigationType } from '@/payload-types'

type RenderOverrides = {
  appearance?: 'inline' | Parameters<typeof CMSLink>[0]['appearance']
  onItemClick?: () => void
}

export const renderMobileNavigationItem = (
  item: NonNullable<NavigationType['navItems']>[number],
  index: number | string,
  overrides: RenderOverrides = {},
): React.ReactNode => {
  const navItem = item.navigationItem
  if (!navItem) return null

  const { appearance: overrideAppearance, onItemClick } = overrides

  // Simple link
  if (navItem.type === 'link' && navItem.link) {
    return (
      <div key={index} onClick={onItemClick}>
        <CMSLink
          {...navItem.link}
          label={navItem.link.label}
          appearance={overrideAppearance ?? navItem.link.appearance ?? 'link'}
          className="type-button py-2 w-full text-left"
        />
      </div>
    )
  }

  // Dropdown with accordion behaviour
  if (
    navItem.type === 'dropdown' &&
    navItem.dropdown?.label &&
    navItem.dropdown?.items &&
    navItem.dropdown.items.length > 0
  ) {
    const dropdown = navItem.dropdown!

    const buttonVariant: ButtonProps['variant'] =
      overrideAppearance ?? dropdown.appearance ?? 'inline'

    const MobileAccordionItem: React.FC = () => {
      const [open, setOpen] = useState(false)
      return (
        <div key={index} className="flex flex-col w-full">
          <Button
            variant={buttonVariant}
            className="w-full flex items-center justify-between gap-1 py-2"
            onClick={() => setOpen(!open)}
          >
            {dropdown.label}
            <ChevronDown
              className={cn('h-4 w-4 transition-transform', open ? 'rotate-180' : 'rotate-0')}
            />
          </Button>
          {open && (
            <div className="pl-4 flex flex-col gap-2 mt-2">
              {dropdown.items!.map((dropdownItem, dropdownIndex) => (
                <div key={dropdownIndex} onClick={onItemClick}>
                  <CMSLink
                    {...dropdownItem.link}
                    appearance={overrideAppearance ?? 'inline'}
                    className="type-button py-2 text-left underline-offset-4 hover:underline text-primary"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    return <MobileAccordionItem key={index} />
  }

  return null
}

export default renderMobileNavigationItem
