import React from 'react'

import type { ContentBlock } from '@/payload-types'

import { DualImage } from './DualImage/Component'
import { Grid } from './Grid/Component'
import { Standard } from './Standard/Component'

const content = {
  dualImage: DualImage,
  grid: Grid,
  standard: Standard,
}

export const RenderContent: React.FC<ContentBlock> = (props) => {
  console.log('Content props:', props)
  const { variant } = props || {}

  if (!variant) return null

  const ContentToRender = content[variant]

  if (!ContentToRender) return null

  return <ContentToRender {...props} />
}
