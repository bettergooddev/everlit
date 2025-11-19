'use client'

import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Navigation as NavigationType } from '@/payload-types'
import Link from 'next/link'

interface NavLogoProps {
  logo?: NavigationType['logo'] | null
}

export const NavLogo: React.FC<NavLogoProps> = ({ logo }) => {
  if (!logo) return null

  const { desktopLogo, mobileLogo, link } = logo

  if (link) {
    return (
      <Link href="/" className="inline-block h-8">
        <Inner desktopLogo={desktopLogo} mobileLogo={mobileLogo} />
      </Link>
    )
  }

  return <Inner desktopLogo={desktopLogo} mobileLogo={mobileLogo} />
}

interface InnerProps {
  desktopLogo?: NavigationType['logo']['desktopLogo']
  mobileLogo?: NavigationType['logo']['mobileLogo']
}

function Inner({ desktopLogo, mobileLogo }: InnerProps) {
  return (
    <>
      {desktopLogo && (
        <Media
          resource={desktopLogo}
          className="hidden md:block size-full w-auto"
          imgClassName="h-full w-auto"
          alt="logo"
          priority={true}
        />
      )}
      {mobileLogo && (
        <Media
          resource={mobileLogo}
          className="block md:hidden size-full w-auto"
          imgClassName="h-full w-auto"
          alt="logo"
          priority={true}
        />
      )}
    </>
  )
}

export default NavLogo
