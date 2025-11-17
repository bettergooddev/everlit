import React from 'react'

import type { Page } from '@/payload-types'
import { Breadcrumb } from '@/components/Breadcrumb'

export const ArchiveHero: React.FC<Page['hero']> = (props) => {
  const { archive } = props || {}
  const { heading, description } = archive || {}

  if (!heading) return null

  return (
    <div className="container mx-auto pt-36 pb-52">
      <div className="flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex justify-start">
          <Breadcrumb />
        </div>

        {/* Heading */}
        {heading && <h1 className="type-h1 text-foreground-900">{heading}</h1>}

        {/* Description */}
        {description && <p className="type-body text-foreground-500 mt-2">{description}</p>}
      </div>
    </div>
  )
}
