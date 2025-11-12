'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatBreadcrumbLabel(segment: string): string {
  // Handle kebab-case to Title Case
  return segment
    .split('-')
    .map((word) => capitalizeFirst(word))
    .join(' ')
}

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const hasSegments = segments.length > 0

  return (
    <nav className="type-body text-foreground-500">
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className={`hover:text-foreground-900 transition-colors ${hasSegments ? 'opacity-60' : ''}`}
          >
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1
          const href = '/' + segments.slice(0, index + 1).join('/')
          const label = formatBreadcrumbLabel(segment)

          return (
            <React.Fragment key={segment}>
              <li className="text-foreground-500 opacity-60">/</li>
              <li>
                {isLast ? (
                  <span className="text-foreground-500">{label}</span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-foreground-900 transition-colors opacity-60"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
