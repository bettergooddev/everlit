'use client'

import * as React from 'react'
import NextLink from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'
import { useTransitionRouter } from 'next-view-transitions'
import { usePageTransition } from '@/providers/PageTransition'

export interface LinkProps
  extends NextLinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  isInternal?: boolean
}

export function isInternalLink(href: string | undefined): boolean {
  if (!href) return true
  // Internal links start with / or are relative paths (no protocol)
  return (
    href.startsWith('/') ||
    (!href.startsWith('http://') &&
      !href.startsWith('https://') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:'))
  )
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, isInternal: isInternalProp, href, ...props }, ref) => {
    const isInternal =
      isInternalProp !== undefined
        ? isInternalProp
        : isInternalLink(typeof href === 'string' ? href : undefined)

    const router = useTransitionRouter()
    const { setTransitioning } = usePageTransition()

    const handleClick = (e: any) => {
      setTransitioning(true)
      setTimeout(() => {
        setTransitioning(false)
      }, 700)
      e.preventDefault()
      router.push(href as string, {
        onTransitionReady: pageAnimation,
      })
    }

    // Only use transition router for internal links without target prop
    const shouldUseTransition = isInternal && !props.target

    return (
      <NextLink
        ref={ref}
        className={className}
        onClick={shouldUseTransition ? handleClick : undefined}
        href={href}
        {...props}
      >
        {children}
      </NextLink>
    )
  },
)

const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        filter: 'blur(0px)',
        opacity: 1,
      },
      {
        filter: 'blur(20px)',
        opacity: 0,
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)',
    },
  )
  document.documentElement.animate(
    [
      {
        filter: 'blur(20px)',
        opacity: 0,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}

Link.displayName = 'Link'

export default Link
