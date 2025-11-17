import React from 'react'

import type { Page } from '@/payload-types'
import { Frame } from '@/components/Frame'

export const SubHero: React.FC<Page['hero']> = (props) => {
  if (!props?.sub) return null

  const { heading, description, image, backgroundImage } = props.sub

  return (
    <div className="container lg:grid lg:grid-cols-[3fr,2fr] pt-36 pb-52 gap-16 flex flex-col">
      <Frame resource={image} className=" size-full object-cover" />

      <div className="h-full flex flex-col-reverse lg:flex-col justify-between gap-8 xl:gap-0">
        <p className="max-w-[48ch]">{description}</p>
        <h1 className="flex flex-col gap-4 text-foreground-900">{heading}</h1>
      </div>
    </div>
  )
}
