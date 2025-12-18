import React from 'react'

import type { Page } from '@/payload-types'
import { Frame } from '@/components/Frame'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { isRichTextEmpty } from '@/utilities/richtext'
import { GlowDesktop, GlowMobile, GlowTablet } from './glow'

export const StudyHero: React.FC<Page['hero']> = (props) => {
  if (!props?.study) return null

  const { image, heading, type, date, location, description, collaborators, scope, features } =
    props.study

  const backgroundImage = (props.study as any).backgroundImage

  return (
    <section className="w-full relative">
      <GlowDesktop backgroundImage={backgroundImage} className="hidden xl:block" />
      <GlowTablet backgroundImage={backgroundImage} className="hidden md:block xl:hidden" />
      <GlowMobile backgroundImage={backgroundImage} className="md:hidden" />
      {/* Hero Image */}
      {image && (
        <div className="relative w-full aspect-square md:aspect-[21/8] overflow-hidden">
          <Frame resource={image} className="size-full" imgClassName="size-full object-cover" />
        </div>
      )}

      {/* Content Section */}
      <div className="relative lg:px-4 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto">
          {/* Heading */}
          {heading && (
            <div className="flex w-full mb-4 md:mb-6">
              <h1 className="type-h1 text-foreground-100">{heading}</h1>
            </div>
          )}

          {/* Metadata Row */}
          {(type || date || location) && (
            <>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                {type && <Badge className="capitalize whitespace-nowrap">{type}</Badge>}
                {date && (
                  <span className="type-body text-foreground-100/75 whitespace-nowrap">{date}</span>
                )}
                {location && (
                  <span className="type-body text-foreground-100/75 whitespace-nowrap">
                    {location}
                  </span>
                )}
              </div>

              {/* Separator */}
              <div className="w-full h-[1px] my-14 bg-foreground-100/5" />
            </>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12">
            {/* Left Column - Description */}
            {description && !isRichTextEmpty(description) && (
              <div className="mb-8 md:mb-0">
                <RichText
                  className="[&_*]:max-w-[48ch] [&_br]:!block"
                  data={description}
                  enableGutter={false}
                />
              </div>
            )}

            {/* Right Column - Stacked Sections */}
            <div className="flex flex-col gap-12 md:gap-8">
              {/* Collaborators */}
              {collaborators && !isRichTextEmpty(collaborators) && (
                <div>
                  <h2 className="type-h3 mb-6 md:mb-4 text-foreground-100">Collaborators</h2>
                  <RichText
                    data={collaborators}
                    className="[&_p]:type-body [&_p]:text-foreground-100/75 [&_ul]:type-body [&_li]:text-foreground-100/75 [&_li::marker]:text-foreground-100/10 [&_br]:!block"
                    enableGutter={false}
                  />
                </div>
              )}

              {/* Scope */}
              {scope && !isRichTextEmpty(scope) && (
                <div>
                  <h2 className="type-h3 mb-6 md:mb-4 text-foreground-100">Scope</h2>
                  <RichText
                    data={scope}
                    className="[&_p]:type-body [&_p]:text-foreground-100/75 [&_ul]:type-body [&_li]:text-foreground-100/75 [&_li::marker]:text-foreground-100/10 [&_br]:!block"
                    enableGutter={false}
                  />
                </div>
              )}

              {/* Features */}
              {features && !isRichTextEmpty(features) && (
                <div>
                  <h2 className="type-h3 mb-6 md:mb-4 text-foreground-100">Features</h2>
                  <RichText
                    data={features}
                    className="[&_p]:type-body [&_p]:text-foreground-100/75 [&_ul]:type-body [&_li]:text-foreground-100/75 [&_li::marker]:text-foreground-100/10 [&_br]:!block"
                    enableGutter={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
