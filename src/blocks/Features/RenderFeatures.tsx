import React from 'react'

import type { FeaturesBlock, Page } from '@/payload-types'

import { Gallery } from './Gallery'
import { Highlights } from './Highlights'

const features = {
  gallery: Gallery,
  highlights: Highlights,
}

export const RenderFeatures: React.FC<FeaturesBlock> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const FeatureToRender = features[type]

  if (!FeatureToRender) return null

  return <FeatureToRender {...props} />
}
