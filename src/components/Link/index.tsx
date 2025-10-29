import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, Media } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'media'
    value: Page | Post | Media | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

// Helpers
export const getPageUrl = (reference: NonNullable<CMSLinkType['reference']>): string | null => {
  if (!reference || (reference.relationTo !== 'pages' && reference.relationTo !== 'posts')) {
    return null
  }

  if (typeof reference.value === 'object' && 'slug' in reference.value && reference.value.slug) {
    return `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${reference.value.slug}`
  }

  return null
}

export const getFileUrl = (reference: NonNullable<CMSLinkType['reference']>): string | null => {
  if (!reference || reference.relationTo !== 'media') {
    return null
  }

  if (typeof reference.value === 'object' && 'url' in reference.value && reference.value.url) {
    return reference.value.url as string
  }

  return null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  let href: string | null = null

  if (type === 'reference' && reference) {
    if (reference.relationTo === 'media') {
      href = getFileUrl(reference)
    } else {
      href = getPageUrl(reference)
    }
  } else {
    href = url || null
  }

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  // If rich text links ever break then check here. I wanted to be able to specify styles for inline links when it came to the navigation, but i was having issues with consistency and i didn't want to define those styles both here and in the button component.
  // if (appearance === 'inline') {
  //   return (
  //     <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
  //       {label && label}
  //       {children && children}
  //     </Link>
  //   )
  // }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
