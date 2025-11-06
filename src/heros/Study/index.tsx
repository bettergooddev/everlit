import React from 'react'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { formatLongDate } from '@/utilities/formatDateTime'

export const StudyHero: React.FC<Page['hero']> = (props) => {
  if (!props?.study?.[0]) return null

  const { image, heading, type, date, location, description, collaborators, scope, features } =
    props.study[0]

  const formattedDate = date ? formatLongDate(date) : null

  return (
    <section className="w-full">
      {/* Hero Image */}
      {image && (
        <div className="relative w-full aspect-[21/7] md:aspect-[21/8] overflow-hidden">
          <Media resource={image} className="size-full" imgClassName="size-full object-cover" />
        </div>
      )}

      {/* Content Section */}
      <div className="relative bg-background px-4 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto max-w-screen-lg">
          {/* Heading */}
          {heading && (
            <div className="flex w-full mb-4 md:mb-6">
              <h1 className="type-h1 text-foreground">{heading}</h1>
            </div>
          )}

          {/* Metadata Row */}
          {(type || formattedDate || location) && (
            <>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
                {type && (
                  <Badge variant="secondary" className="capitalize">
                    {type}
                  </Badge>
                )}
                {formattedDate && (
                  <span className="type-body text-foreground/75">{formattedDate}</span>
                )}
                {location && <span className="type-body text-foreground/75">{location}</span>}
              </div>

              {/* Separator */}
              <div
                className="w-full h-[2px] mb-8 md:mb-10"
                style={{
                  background:
                    'radial-gradient(ellipse at center, hsl(var(--border)) 0%, transparent 80%)',
                }}
              />
            </>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12">
            {/* Left Column - Description */}
            {description && (
              <div>
                <RichText data={description} enableGutter={false} />
              </div>
            )}

            {/* Right Column - Stacked Sections */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Collaborators */}
              {collaborators && (
                <div>
                  <h2 className="type-h3 mb-3 md:mb-4 text-foreground">Collaborators</h2>
                  <RichText
                    data={collaborators}
                    className="[&_p]:type-body [&_p]:text-foreground/75 [&_ul]:type-body [&_li]:text-foreground/75"
                    enableGutter={false}
                  />
                </div>
              )}

              {/* Scope */}
              {scope && (
                <div>
                  <h2 className="type-h3 mb-3 md:mb-4 text-foreground">Scope</h2>
                  <RichText
                    data={scope}
                    className="[&_p]:type-body [&_p]:text-foreground/75 [&_ul]:type-body [&_li]:text-foreground/75"
                    enableGutter={false}
                  />
                </div>
              )}

              {/* Features */}
              {features && (
                <div>
                  <h2 className="type-h3 mb-3 md:mb-4 text-foreground">Features</h2>
                  <RichText
                    data={features}
                    className="[&_p]:type-body [&_p]:text-foreground/75 [&_ul]:type-body [&_li]:text-foreground/75"
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

