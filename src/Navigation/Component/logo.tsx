'use client'

import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Navigation as NavigationType } from '@/payload-types'

interface NavLogoProps {
  logo?: NavigationType['logo'] | null
}

export const NavLogo: React.FC<NavLogoProps> = ({ logo }) => {
  if (!logo) return null

  const { desktopLogo, mobileLogo, link } = logo

  if (link) {
    return (
      <CMSLink
        {...link}
        className="inline-block transition-all duration-150 hover:scale-95 hover:opacity-70 hover:-rotate-[1.5deg]"
        appearance="inline"
        label={''}
      >
        <Inner desktopLogo={desktopLogo} mobileLogo={mobileLogo} />
      </CMSLink>
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
          className="hidden md:block h-9 w-auto"
          imgClassName="h-full w-auto"
          alt="logo"
        />
      )}
      {mobileLogo && (
        <Media
          resource={mobileLogo}
          className="block md:hidden h-9 w-auto"
          imgClassName="h-full w-auto"
          alt="logo"
        />
      )}
    </>
  )
}

export default NavLogo
