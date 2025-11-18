'use client'
import React from 'react'
import Section from '@/components/Section'

import clsx from 'clsx'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Dialog, DialogContent, DialogTrigger, VideoIframe } from '@relume_io/relume-ui'
import type { ButtonProps } from '@relume_io/relume-ui'
import { RxChevronRight } from 'react-icons/rx'
import { FaCirclePlay } from 'react-icons/fa6'
import type { Tabs as TabsBlockProps } from '@/payload-types'
import { Frame } from '@/components/Frame'

export const TabsBlock: React.FC<TabsBlockProps> = ({
  heading,
  description,
  highlights,
  reverseLayout,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Section>
      <div className="container">
        <div className="relative flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-6 xl:pr-10">
            <div className="mb-8 lg:hidden">
              <h2 className="mb-5 lg:mb-6 type-h2">{heading}</h2>
              <p className="type-body opacity-65 max-w-[48ch]">{description}</p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {highlights.map((highlight, index) => {
                if (activeTab !== index) return null
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative flex h-full w-full items-center justify-center"
                  >
                    {highlight.media && (
                      <Frame
                        resource={highlight.media}
                        className="mb-6 size-full lg:mb-0"
                        imgClassName="size-full object-cover"
                      />
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-6 xl:pl-10 flex flex-col justify-between">
            <div className="mb-8 hidden lg:block">
              <h2 className="mb-5 lg:mb-6 type-h2">{heading}</h2>
              <p className="type-body opacity-65 max-w-[48ch]">{description}</p>
            </div>
            <div className="static flex flex-col flex-wrap justify-stretch lg:block">
              <div className="relative grid auto-cols-fr grid-cols-1 grid-rows-[auto_auto] items-start lg:mb-0 lg:items-stretch">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={clsx(
                      'flex cursor-pointer items-center gap-4 border-b border-border-primary py-4',
                      {
                        'opacity-100': activeTab === index,
                        'opacity-25': activeTab !== index,
                      },
                    )}
                  >
                    <div className="flex-none self-start">
                      <Frame resource={highlight.media} className="size-8" />
                    </div>
                    <div>
                      <h4 className="type-h4">{highlight.heading}</h4>
                      <motion.div
                        initial={false}
                        animate={{
                          height: activeTab === index ? 'auto' : 0,
                          opacity: activeTab === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 type-body opacity-65 max-w-[48ch]">
                          {highlight.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
