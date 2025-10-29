import React from 'react'

import { NavigationClient } from './client'
import { getCachedGlobal } from '@/utilities/getGlobals'

import type { Navigation } from '@/payload-types'

export async function Navigation() {
  const navigationData = (await getCachedGlobal('navigation', 1)()) as Navigation

  return <NavigationClient data={navigationData} />
}

export default Navigation
