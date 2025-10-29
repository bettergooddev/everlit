import React from 'react'
import { ChevronDown } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import type { Navigation as NavigationType } from '@/payload-types'
import { Button, type ButtonProps } from '@/components/ui/button'

type RenderOverrides = {
  appearance?: 'inline' | NonNullable<ButtonProps['variant']>
}

export const renderNavigationItem = (
  item: NonNullable<NavigationType['navItems']>[number],
  index: number | string,
  overrides: RenderOverrides = {},
): React.ReactNode => {
  const navItem = item.navigationItem
  if (!navItem) return null

  const { appearance: overrideAppearance } = overrides

  // Simple link
  if (navItem.type === 'link' && navItem.link) {
    return (
      <CMSLink
        key={index}
        {...navItem.link}
        appearance={overrideAppearance ?? navItem.link.appearance ?? 'inline'}
        className="type-button hover:underline theme-cafe"
      />
    )
  }

  // Dropdown with sub-items
  if (navItem.type === 'dropdown' && navItem.dropdown?.label && navItem.dropdown?.items) {
    // Type safe approach to getting the variant
    const variantCandidate =
      overrideAppearance ?? navItem.dropdown?.appearance ?? navItem.link?.appearance ?? 'link'

    const buttonVariant = variantCandidate === 'inline' ? 'link' : variantCandidate

    return (
      <div key={index} className="relative group" data-theme="cafe">
        <Button
          className="flex items-center gap-1 type-button hover:text-primary underline-offset-4 transition-colors"
          variant={buttonVariant}
          asChild
        >
          <button>
            {navItem.dropdown.label}
            <ChevronDown className="w-4 h-4" />
          </button>
        </Button>
        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-card border border-primary/25 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-0">
            {navItem.dropdown.items.map((dropdownItem, dropdownIndex) => (
              <CMSLink
                key={dropdownIndex}
                {...dropdownItem.link}
                className="block px-4 py-3 type-button hover:bg-secondary transition-colors"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default renderNavigationItem
