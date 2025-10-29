import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Footer as FooterType } from '@/payload-types'
import type { HoursType } from '@/collections/Hours/types'

import { FooterClient } from './client'
import { BusinessHours } from '@/components/BusinessHours'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType

  const payload = await getPayload({ config: configPromise })
  const hoursData = await payload.findGlobal({
    slug: 'hours',
    depth: 1,
  })

  const hours = (hoursData.hours || []) as HoursType

  return (
    <FooterClient data={footerData} hours={hours}>
      <BusinessHours hours={hours} className="shadow-lg" />
    </FooterClient>
  )
}

export default Footer
