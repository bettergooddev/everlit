import React from 'react'
import type {
  TestimonialsBlock as TestimonialsBlockType,
  Testimonial as TestimonialCollectionType,
} from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Heading } from '@/components/Heading'
import { Frame } from '@/components/Frame'
import StarRating from '@/components/StarRating'
import { Media } from '@/components/Media'
import * as motion from 'motion/react-client'
import { fadeUpInView } from '@/utilities/animations'

export const TestimonialsBlock: React.FC<TestimonialsBlockType> = async ({
  heading,
  subheading,
}) => {
  const payload = await getPayload({ config: configPromise })

  const testimonialsGlobal = await payload.findGlobal({
    slug: 'testimonials',
    depth: 1,
  })

  const testimonials = testimonialsGlobal.testimonials || []

  return (
    <div className="container">
      <Heading heading={heading} subheading={subheading} />

      {testimonials.length > 0 && (
        <div className="grid grid-cols-1 px-4 min-[54.4rem]:px-48 min-[68rem]:grid-cols-3 gap-8 min-[68rem]:px-0 theme-sugar-shack">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

type TestimonialType = NonNullable<TestimonialCollectionType['testimonials']>[number]

function TestimonialCard({ testimonial, index }: { testimonial: TestimonialType; index: number }) {
  return (
    <motion.div
      className="flex w-full flex-col items-start border-[10px] border-white drop-shadow-md bg-white"
      {...fadeUpInView(index)}
    >
      <Media
        resource={testimonial.image}
        className="size-full min-h-[20rem] h-[20rem]"
        imgClassName="size-full object-cover"
      />

      <div className="p-4 mt-2 flex flex-col size-full h-min min-[68rem]:h-full">
        <StarRating className="[&>svg]:theme-pizza [&>svg]:text-primary mb-5 md:mb-6" />
        <blockquote className="type-h5 !font-normal text-foreground/65 md:text-md mb-3 md:mb-6">
          {testimonial.review}
        </blockquote>

        <div className="min-[68rem]:mt-auto flex w-full items-start md:w-fit flex-row md:items-center mt-2">
          <Media
            resource={testimonial.author.profilePicture}
            className="size-11 min-h-11 min-w-11 rounded-full overflow-hidden mb-0 mr-4"
            imgClassName="size-full object-cover"
          />
          <div className="">
            <p className="type-h5 text-foreground">{testimonial.author.name}</p>
            <p className="type-h5 text-foreground/65 !font-normal mt-0.5 ">
              {testimonial.author.role}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
