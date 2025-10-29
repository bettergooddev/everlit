import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type {
  Background as BackgroundType,
  Media as MediaType,
  Page as PageType,
} from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

export async function Background({ background }: { background?: PageType['background'] }) {
  // @ts-ignore, it really didn't like being told that they will always be images, and they will always have an id.
  const { layers }: { layers: { media: MediaType; id: string }[] } = background

  const [polka, blanket, ...remainingImages] = layers
  if (!polka || !blanket) return null

  const config = {
    polka: {
      size: 15,
      opacity: 1.5,
    },
    blanket: {
      size: 700,
      opacity: 5,
    },
  }

  return (
    <div className="absolute -z-10 h-full w-full overflow-hidden">
      {polka && (
        <div
          className="absolute inset-0 w-full h-full mix-blend-darken"
          style={{
            opacity: config.polka.opacity / 100,
            backgroundImage: `url(${getClientSideURL()}${polka.media.url})`,
            backgroundRepeat: 'repeat',
            backgroundSize: `${config.polka.size}px ${config.polka.size}px`,
          }}
        />
      )}
      {blanket && (
        <div
          className="absolute inset-0 -z-10 w-full h-full mix-blend-darken"
          style={{
            opacity: config.blanket.opacity / 100,
            backgroundImage: `url(${getClientSideURL()}${blanket.media.url})`,
            backgroundRepeat: 'repeat',
            backgroundSize: `${config.blanket.size}px ${config.blanket.size}px`,
          }}
        />
      )}

      <div
        data-theme="sugar-shack"
        className="absolute inset-0 -z-[11] w-full h-full bg-background"
      ></div>
    </div>
  )
}
