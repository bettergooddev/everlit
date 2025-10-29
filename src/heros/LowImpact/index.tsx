import React from 'react'

import type { Page } from '@/payload-types'

export const LowImpactHero: React.FC<Page['hero']> = (props) => {
  if (!props?.lowImpact?.[0]) return null

  const { heading, subheading } = props.lowImpact[0]

  return (
    <section className="w-full py-24" data-theme="cafe">
      <div className="container mx-auto px-4 text-center prose max-w-screen-md">
        <h1 className="mb-4 text-foreground">{heading}</h1>
        {subheading && <p className="mx-auto max-w-[60ch] text-foreground/75">{subheading}</p>}
      </div>
    </section>
  )
}
