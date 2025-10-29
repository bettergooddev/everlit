'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import { DynamicIcon } from 'lucide-react/dynamic'
import { TypeGenerator } from '@/payload-types'

export const IconList: React.FC<{ items?: TypeGenerator[] }> = ({ items = [] }) => {
  if (!items || items.length === 0) return null

  return (
    <ul className="flex flex-col gap-5">
      {items.map((item) => (
        <li key={item.id} className="flex items-center">
          {item.iconLink.lucideIcon && (
            <span className="mr-2 leading-none">
              <DynamicIcon name={item.iconLink.lucideIcon as any} size={16} strokeWidth={2.5} />
            </span>
          )}
          {item.iconLink.link && (
            <CMSLink
              {...item.iconLink.link}
              appearance="inline"
              className="hover:underline text-background"
            />
          )}
        </li>
      ))}
    </ul>
  )
}
