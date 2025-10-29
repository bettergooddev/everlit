'use client'

import { Card } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
import { useHover } from '@uidotdev/usehooks'
import { tv } from 'tailwind-variants'
import { CMSLink } from '@/components/Link'

type CardType = NonNullable<Card['cards']>[number]

function PlayingCard({ card, className }: { card: CardType; className?: string }) {
  const [ref, hovering] = useHover()
  const isHighImpact = card.style === 'high-impact'

  const patternStyle = {
    opacity: card.patternOpacity,
    backgroundSize: `${card.patternSize}px`,
  }

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'relative theme-pizza border-foreground border-[6px] rounded-xl overflow-hidden aspect-[5/7] h-[10rem]',
          className,
        )}
      >
        <CMSLink
          className="absolute z-10 inset-0 pointer-events-auto"
          {...card.link}
          label={null}
          aria-label={card.name}
          appearance="inline"
        />

        <div className="absolute inset-0 theme-sugar-shack bg-background -z-[1]">
          <Media
            resource={card.hoverImage}
            className={cn(
              'absolute size-full transition-opacity duration-300',
              hovering ? 'opacity-100' : 'opacity-0',
            )}
            imgClassName="size-full object-cover scale-[1.45] saturate-0 opacity-20"
          />

          <div
            className={cn(
              'absolute -z-[1] inset-0 transition-opacity duration-300',
              hovering ? 'opacity-0' : 'opacity-100',
            )}
          >
            <div
              className={cn('absolute inset-0 mix-blend-darken')}
              style={{
                backgroundImage: `url(${getClientSideURL()}${(card.pattern as any).url})`,
                backgroundRepeat: 'repeat',
                ...patternStyle,
              }}
            />
          </div>
        </div>

        <div className="relative theme-pizza size-full flex flex-col items-center justify-center text-center ">
          {card.logo && <Media resource={card.logo} className="size-28 object-contain mb-4" />}
          {isHighImpact && <h5 className="text-foreground type-h5 mb-2 mt-4">{card.eyebrow}</h5>}
          <h2 className="type-h1 md:type-h2 text-foreground">{card.name}</h2>
        </div>
      </div>
    </>
  )
}

export default PlayingCard
