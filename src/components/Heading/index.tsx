'use client'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { annotate } from 'rough-notation'
import { RoughAnnotation } from 'rough-notation/lib/model'
import { CallToActionBlock, FeaturesBlock } from '@/payload-types'
import { CMSLink } from '../Link'

class Annotation {
  constructor(
    public element: HTMLElement,
    public annotation: RoughAnnotation,
  ) {
    this.element = element
    this.annotation = annotation
  }

  static create(element: HTMLElement) {
    const annotation = annotate(element, {
      type: 'underline',
      padding: [0, 0, 0, 0],
      multiline: true,
    })
    return new Annotation(element, annotation)
  }

  show() {
    this.annotation.show()
  }

  hide() {
    this.annotation.hide()
  }
}

export const Heading = ({
  heading,
  subheading,
  actions,
  className,
}: {
  heading?: FeaturesBlock['heading']
  subheading?: string | null
  actions?: NonNullable<CallToActionBlock['links']>
  className?: string
}) => {
  const textWrapper = useRef<HTMLDivElement>(null)
  const annotations = useRef<Annotation[]>([])
  const isInView = useInView(textWrapper, { margin: '-50px' })

  useEffect(() => {
    if (!textWrapper.current) return

    const text = textWrapper.current.querySelectorAll('em') as NodeListOf<HTMLElement>

    annotations.current.forEach((a) => a.hide())
    annotations.current = []

    text.forEach((t, index) => {
      const annotation = Annotation.create(t)
      annotations.current.push(annotation)
    })

    return () => {
      annotations.current.forEach((a) => a.hide())
      annotations.current = []
    }
  }, [textWrapper])

  useEffect(() => {
    if (isInView) {
      annotations.current.forEach((a) => a.show())
    } else {
      annotations.current.forEach((a) => a.hide())
    }
  }, [isInView])

  return (
    <div data-theme="sugar-shack" className={cn('mb-16', className)}>
      {heading && (
        <div className="" ref={textWrapper}>
          <RichText
            data={heading}
            enableGutter={false}
            className={cn(
              'prose-center [&_*]:text-foreground type-h1 text-center',
              '[&_em]:type-h2-accent [&_em]:theme-pizza [&_svg]:theme-pizza [&_svg]:stroke-foreground',
            )}
          />
        </div>
      )}

      {subheading && (
        <p className="opacity-75 type-body text-center text-foreground mx-auto max-w-[52ch] mt-4">
          {subheading}
        </p>
      )}

      {actions && (
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center theme-pizza">
          {actions.map((action) => (
            <CMSLink key={action.id} {...action.link} />
          ))}
        </div>
      )}
    </div>
  )
}
