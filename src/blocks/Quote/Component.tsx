import React from 'react'
import type { Quote as QuoteType } from '@/payload-types'
import Section from '@/components/Section'
import { GraphicDoubleQuote } from '@/paths/paths'
import { Media } from '@/components/Media'
import * as motion from 'motion/react-client'

export const Quote: React.FC<QuoteType> = ({ quote, backgroundImage }) => {
  return (
    <div className="-my-[25rem] overflow-hidden z-[1]">
      <Section className="relative !my-[25rem]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="absolute inset-0 z-[-1]"
        >
          <motion.div
            animate={{
              rotate: 15,
              top: '-400px',
              right: '-10%',
              y: '0%',
              x: '0%',
              width: '1200px',
              height: '1200px',
            }}
            className="absolute size-full z-[0]"
          >
            <Media
              resource={backgroundImage}
              className="blur-xl object-left"
              imgClassName="size-full object-left"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="absolute inset-0 z-[-1]"
        >
          <motion.div
            animate={{
              rotate: 195,
              bottom: '-400px',
              left: '-10%',
              y: '0%',
              x: '0%',
              width: '1200px',
              height: '1200px',
            }}
            className="absolute size-full z-[0]"
          >
            <Media
              resource={backgroundImage}
              className="blur-xl object-left"
              imgClassName="size-full object-left"
            />
          </motion.div>
        </motion.div>

        <div className="container text-center relative">
          <GraphicDoubleQuote className="size-32 absolute top-1/2 left-0 -translate-y-[calc(50%+8px)] opacity-5 " />
          <blockquote className="type-h3 max-w-[22ch] mx-auto italic ">{quote}</blockquote>
        </div>
      </Section>
    </div>
  )
}
