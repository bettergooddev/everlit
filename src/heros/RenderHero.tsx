import React from 'react'

import type { Page } from '@/payload-types'

import { MainHero } from '@/heros/Main'
import { ArchiveHero } from '@/heros/Archive'
import { StudyHero } from '@/heros/Study'
import { SubHero } from '@/heros/Sub'
import { MultiImageHero } from '@/heros/MultiImage'

const heroes = {
  main: MainHero,
  archive: ArchiveHero,
  study: StudyHero,
  sub: SubHero,
  multiImage: MultiImageHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
