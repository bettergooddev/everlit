import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Footer as FooterType } from '@/payload-types'

import { FooterClient } from './client'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType

  const payload = await getPayload({ config: configPromise })

  return <FooterClient data={footerData}></FooterClient>
}

export default Footer
