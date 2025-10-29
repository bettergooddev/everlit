'use client'

import type { Page } from '@/payload-types'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Frame } from '@/components/Frame'
import { useWindowWidth } from '@/react/useWindowWidth'

export const HighImpactHero: React.FC<Page['hero']> = (props) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!props?.highImpact?.[0]) return null

  const { logos, heading, subheading, media, backgroundLayers } = props?.highImpact?.[0]
  const [logoLeft, logoCenter, logoRight] = logos || []

  const imagePool1 = media.slice(0, Math.floor(media.length / 2))
  const imagePool2 = media.slice(Math.floor(media.length / 2))

  return (
    <>
      <section
        className="relative min-h-screen overflow-hidden flex flex-col justify-center pb-24 md:pb-60 pt-12"
        data-theme="cafe"
      >
        <HeroBackground backgroundLayers={backgroundLayers} scrollY={scrollY} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          {/* Logos */}
          {logos && logos.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16 md:mb-12 mb-[4rem] w-full container md:max-w-screen-lg max-w-[360px] md:px-12 px-0">
              <CMSLink
                {...logoCenter?.link}
                appearance="inline"
                label={null}
                className="w-[70%] md:w-[35%] md:order-2"
              >
                <Media resource={logoCenter?.logo} className="h-auto" imgClassName="size-full" />
              </CMSLink>

              <div className="flex w-full justify-center gap-8 md:contents">
                <CMSLink
                  {...logoLeft?.link}
                  appearance="inline"
                  label={null}
                  className="w-[35%] md:w-[17.5%] md:order-1 transition-all duration-150 hover:scale-95 hover:opacity-70 hover:-rotate-3"
                >
                  <Media resource={logoLeft?.logo} className="h-auto" imgClassName="size-full" />
                </CMSLink>
                <CMSLink
                  {...logoRight?.link}
                  appearance="inline"
                  label={null}
                  className="w-[35%] md:w-[17.5%] md:order-3 transition-all duration-150 hover:scale-95 hover:opacity-70 hover:rotate-3"
                >
                  <Media resource={logoRight?.logo} className="h-auto" imgClassName="size-full" />
                </CMSLink>
              </div>
            </div>
          )}

          <div className="prose max-w-screen-lg text-center flex flex-col items-center">
            <h1 className="mb-0 text-foreground">{heading}</h1>
            {subheading && <p className="max-w-[46ch] mb-12 text-foreground">{subheading}</p>}
          </div>

          {/* Down Arrow */}
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-foreground" />
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="-mt-[15%] lg:-mt-32 md:mb-0">
        <div className="flex w-screen justify-start overflow-hidden py-2">
          <div className="grid shrink-0 grid-cols-1 gap-y-4">
            <div className="grid w-full animate-marquee-top auto-cols-fr grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((_, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {imagePool1.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[110%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <Frame
                        resource={image}
                        className="absolute inset-0 size-full object-cover"
                        imgClassName="size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="grid w-full animate-marquee-bottom grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((_, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {imagePool2.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[110%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <Frame
                        resource={image}
                        className="absolute inset-0 size-full object-cover"
                        imgClassName="size-full object-cover inset-0"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const HeroBackground: React.FC<{
  backgroundLayers?: (string | MediaType)[] | null
  scrollY: number
}> = ({ backgroundLayers, scrollY }) => {
  const [rightLayer, leftLayer, centerLayer] = backgroundLayers || []
  const windowWidth = useWindowWidth()

  return (
    <div className="absolute inset-0 -mt-[15%] bottom-12">
      {rightLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: windowWidth >= 1024 ? `translateY(${scrollY * -0.05}px)` : 'none',
          }}
        >
          <Media
            resource={rightLayer}
            className="size-full absolute inset-0"
            imgClassName="size-full object-contain lg:object-center object-bottom lg:object-cover lg:translate-y-[3rem] lg:translate-x-[4rem] lg:scale-[0.94] lg:origin-bottom"
          />
        </div>
      )}

      {leftLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: windowWidth >= 1024 ? `translateY(${scrollY * -0.1}px)` : 'none',
          }}
        >
          <Media
            resource={leftLayer}
            className="size-full absolute inset-0"
            imgClassName="size-full object-contain lg:object-center object-bottom lg:object-cover lg:translate-y-[3rem] lg:-translate-x-[4rem] lg:scale-[0.94] lg:origin-bottom"
          />
        </div>
      )}

      {centerLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: windowWidth >= 1024 ? `translateY(${scrollY * -0.15}px)` : 'none',
          }}
        >
          <Media
            resource={centerLayer}
            className="size-full absolute inset-0"
            imgClassName="size-full object-contain lg:object-center object-bottom lg:object-cover lg:translate-y-[5rem] "
          />
        </div>
      )}

      <div
        data-theme="sugar-shack"
        className="absolute inset-0 h-[75%] lg:h-[30%] mt-auto bg-gradient-to-b  from-background/0 to-background"
        style={{
          transform:
            windowWidth >= 1024 ? `translateY(calc(${scrollY * -0.15}px + 5.05rem))` : 'none',
        }}
      />
    </div>
  )
}
