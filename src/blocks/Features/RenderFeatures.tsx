import React from 'react'

import type { FeaturesBlock, Page } from '@/payload-types'

import { Highlights } from './Highlights'

export const RenderFeatures: React.FC<FeaturesBlock> = (props) => {
  console.log('Features props:', props)
  return <Highlights {...props} />
}
