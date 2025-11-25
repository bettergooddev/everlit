'use client'

import React from 'react'
import { Link } from '@/components/ui/link'
import { motion } from 'motion/react'

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
    <footer className="mt-section bg-background-500/35 pb-16 p-12 lg:p-16 lg:pb-20 relative overflow-hidden">
      <div className="absolute inset-0 border-t-foreground-100/10 border-t-[0.0625rem] z-[10]" />

      <div className="absolute inset-0 bg-background/5 backdrop-blur-sm z-[1]" />

      <motion.div
        animate={{
          rotateY: [15.87, -15.87, 15.87],
          // rotateX: [10, -10, 10],
          translateY: [2.645, -2.645, 2.645],
          translateX: [6.6125, -6.6125, 6.6125],
          opacity: [100, 80, 100],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <Media
          resource={backgroundImage}
          className="flex justify-center absolute left-[40%] -top-[380px] lg:-top-[320px] inset-0 -translate-x-1/2 lg:left-[45%] z-[0]"
          imgClassName="max-w-[unset] size-[2000px] object-contain object-top "
        />
      </motion.div>

      <div className="gap-20 grid grid-cols-1 lg:grid-cols-[auto,1fr] items-center z-10 relative">
        <Link href="/" className="w-auto h-full max-h-24 flex justify-center">
          <Media
            resource={logoImage}
            className="w-auto h-full max-h-24 flex justify-center"
            imgClassName="w-auto lg:w-auto h-16 lg:h-full"
          />
        </Link>
        <div className="w-full">
          <div className="flex lg:flex-row flex-col w-full justify-between items-center pb-8 border-b-[0.0625rem] border-foreground-100/10 lg:gap-0 gap-8">
            <FooterLinks links={links} className="" />
            <FooterButtons buttons={buttons} className="lg:flex-row flex-col lg:w-min w-full" />
          </div>
          <div className="flex w-full pt-8 justify-between lg:flex-row flex-col lg:gap-0 gap-8">
            <WebsiteTag className="lg:order-1 order-2 lg:w-min w-full justify-center" />
            <FooterSocials socials={socials} className="lg:order-2 order-1  justify-center" />
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
    <ul className={cn('flex flex-row gap-5', className)}>
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
          <CMSLink {...link} className="lg:w-min w-full" label={link.label} />
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
