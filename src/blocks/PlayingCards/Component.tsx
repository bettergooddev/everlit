import { Heading } from '@/components/Heading'
import { MaskBackground } from '@/components/MaskBackground'
import type { Card, PlayingCardsBlock as PlayingCardsBlockProps } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import BounceCards from '@/components/BounceCards'
import PlayingCard from '../../components/PlayingCard'
import { CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'

export const PlayingCardsBlock: React.FC<PlayingCardsBlockProps> = async (props) => {
  const cardsResponse: Card = await getCachedGlobal('card', 1)()
  const cards = cardsResponse.cards
  const { heading, subheading, attachToFooter: attachToFooterProp } = props
  const attachToFooter = Boolean(attachToFooterProp)

  return (
    <div
      className={cn(
        'relative [--card-height:22rem]',
        attachToFooter ? '-mb-[6rem] md:-mb-48 ' : '',
      )}
    >
      <div className="container">
        <Heading heading={heading} subheading={subheading} />
      </div>

      <MaskBackground
        shape={'wood'}
        innerClassName="relative flex justify-center"
        disableBottom={attachToFooter}
      >
        <>
          {/* Desktop */}
          <BounceCards
            className="h-[calc(var(--card-height)+9rem)] hidden md:flex"
            cardClassName="rounded-xl"
            invertStackingOrder={true}
            elements={cards?.map((card) => (
              <PlayingCard key={card.id} card={card} className="!h-[var(--card-height)]" />
            ))}
          />
          {/* Mobile */}
          <Badge className="theme-pizza absolute top-0 left-1/2 -translate-x-1/2 !bg-primary !text-background !type-h5 !font-normal pt-1.5 pb-1 px-4 -mb-12 mt-8 !type-border md:hidden whitespace-nowrap">
            Tap to learn more!
          </Badge>
          <Carousel
            className="w-full h-[calc(var(--card-height)+12rem)] flex flex-col justify-center mt-8 md:hidden"
            opts={{
              align: 'center',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-6">
              {cards?.map((card) => (
                <CarouselItem key={card.id} className=" w-full basis-[min-content] pl-6">
                  <PlayingCard card={card} className="!h-[var(--card-height)]" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="relative flex justify-center gap-8 mt-8 theme-pizza -mb-4">
              <CarouselPrevious className="size-10 [&>*]:size-5 flex relative !transform-none inset-0 [&_*]:stroke-foreground border-none" />
              <CarouselNext className="size-10 [&>*]:size-5 flex relative !transform-none inset-0 [&_*]:stroke-foreground border-none" />
            </div>
          </Carousel>
        </>
      </MaskBackground>
    </div>
  )
}
