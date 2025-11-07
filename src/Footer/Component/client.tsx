'use client'

import React from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'

import type { Footer as FooterType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import WebsiteTag from '@/components/WebsiteTag'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

interface FooterClientProps {
  data: FooterType
}

export const FooterClient: React.FC<FooterClientProps> = ({ data }) => {
  const { backgroundImage, logoImage } = data
  const links = (data?.links ?? []) as NonNullable<FooterType['links']>
  const buttons = (data?.buttons ?? []) as NonNullable<FooterType['buttons']>
  const socials = (data?.socials ?? []) as NonNullable<FooterType['socials']>

  return (
    <footer className="bg-background-500 p-16 pb-20 border-t-foreground-100/10 border-t-[0.0625rem] relative overflow-hidden">
      <div className="absolute inset-0 bg-background/20 backdrop-blur-sm z-[0]" />

      <Media
        resource={backgroundImage}
        className="flex justify-center absolute -top-[130px] md:-top-[270px] inset-0 -translate-x-1/2 left-1/2"
        imgClassName="max-w-[unset] size-[1000px] md:size-[2000px] object-contain object-top "
      />

      <div className="gap-20 grid grid-cols-[auto,1fr] items-center z-10 relative">
        <Media
          resource={logoImage}
          className="w-auto h-full max-h-24 flex"
          imgClassName="w-auto h-full"
        />
        <div className="w-full">
          <div className="flex w-full justify-between items-center pb-8 border-b-[0.0625rem] border-foreground-100/25">
            <FooterLinks links={links} className="" />
            <FooterButtons buttons={buttons} className="" />
          </div>
          <div className="flex w-full pt-8 justify-between">
            <WebsiteTag />
            <FooterSocials socials={socials} />
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({
  links,
  className,
}: {
  links: NonNullable<FooterType['links']>
  className?: string
}) {
  return (
    <ul className={cn('flex flex-row gap-3.5', className)}>
      {(links ?? []).map(({ link, id }, i) => (
        <li key={id ?? i}>
          <CMSLink {...link} appearance="link" className="" label={link.label} />
        </li>
      ))}
    </ul>
  )
}

function FooterButtons({
  buttons,
  className,
}: {
  buttons: NonNullable<FooterType['buttons']>
  className?: string
}) {
  return (
    <ul className={cn('flex flex-row gap-3.5', className)}>
      {(buttons ?? []).map(({ link, id }, i) => (
        <li key={id ?? i}>
          <CMSLink {...link} className="" label={link.label} />
        </li>
      ))}
    </ul>
  )
}

function FooterSocials({
  socials,
  className,
}: {
  socials: NonNullable<FooterType['socials']>
  className?: string
}) {
  return (
    <ul className={cn('flex flex-row gap-3.5', className)}>
      {(socials ?? []).map(({ link, image, id }, i) => (
        <li key={id ?? i}>
          <CMSLink {...link} appearance={'none'} className="" label={''}>
            <span className="sr-only">{link.label}</span>
            <Media resource={image} className="w-auto h-auto flex " imgClassName="w-full h-7" />
          </CMSLink>
        </li>
      ))}
    </ul>
  )
}

export default FooterClient
