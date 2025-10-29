'use client'

import React from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import WebsiteTag from '@/components/WebsiteTag'

interface FooterClientProps {
  data: FooterType
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const groups = (data?.groups ?? []) as NonNullable<FooterType['groups']>

  return (
    <footer
      className="mt-auto border-t border-primary/10 bg-muted text-foreground"
      data-theme="sugar-shack"
    >
      <div className="w-full px-4 py-8 md:px-16 md:py-16">
        {/* Groups */}
        <div className="flex flex-col gap-16 md:grid md:grid-cols-2 md:gap-12 lg:flex lg:flex-row lg:gap-16 lg:justify-between">
          {/* Groups */}
          {groups.map((group, i) => (
            <div key={group.id ?? i} className="flex flex-col gap-4">
              {group.heading && <h4 className="font-bold whitespace-nowrap">{group.heading}</h4>}

              <ul className="flex flex-col gap-3.5">
                {(group.linkGroups ?? []).map((linkGroup, j) => (
                  <li key={linkGroup.id ?? j}>
                    <CMSLink
                      {...linkGroup.link}
                      appearance="link"
                      className="text-foreground hover:underline flex items-center gap-1.5"
                      label={''}
                    >
                      {linkGroup?.lucideIcon && (
                        <DynamicIcon
                          name={linkGroup?.lucideIcon as any}
                          size={16}
                          className="size-4 min-w-4"
                        />
                      )}
                      {linkGroup.link.label}
                    </CMSLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <WebsiteTag />
    </footer>
  )
}

export default FooterClient
