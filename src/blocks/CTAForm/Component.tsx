'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  useForm,
  FormProvider,
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields as fieldComponents } from './fields'
import { createOnCTASubmit } from './actions/onCTASubmit'
import { Email } from '../Form/Email'
import { Error as FormError } from '../Form/Error'
import { FormLabel } from '../Form/FormLabel'
import { Textarea } from '../Form/Textarea'
import type { CallToActionBlock as CallToActionBlockPayloadType } from '@/payload-types'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import { isFieldFull } from './actions/isFieldFull'
import { Media } from '@/components/Media'
import Section from '@/components/Section'

export type CallToActionBlockType = CallToActionBlockPayloadType & {
  form: FormType
}

export const CallToActionBlock: React.FC<
  {
    id?: string
  } & CallToActionBlockType
> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    heading,
    backgroundImage,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    trigger,
    watch,
    setValue,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [showMessage, setShowMessage] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set())
  const [hoveredFields, setHoveredFields] = useState<Set<string>>(new Set())
  const [focusedFields, setFocusedFields] = useState<Set<string>>(new Set())
  const [formPhase, setFormPhase] = useState(0)
  const router = useRouter()

  const hasFields = formFromProps && formFromProps.fields
  const fields = formFromProps.fields

  const onSubmit = useCallback(
    createOnCTASubmit({
      formID,
      confirmationType,
      redirect,
      setIsLoading,
      setHasSubmitted,
      setError,
      router,
    }),
    [router, formID, redirect, confirmationType],
  )

  const incrementFormProgress = useCallback((amount: number = 1) => {
    setFormProgress((currentProgress) => currentProgress + amount)
  }, [])

  const decrementFormProgress = useCallback((amount: number = 1) => {
    setFormProgress((currentProgress) => Math.max(0, currentProgress - amount))
  }, [])

  const incrementFormPhase = useCallback((amount: number = 1) => {
    setFormPhase((currentPhase) => currentPhase + amount)
  }, [])

  const handleFormPhaseClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      incrementFormPhase(1)
    },
    [incrementFormPhase],
  )

  const getFormAttentionHandlers = useCallback(
    (fieldName: string, amount: number = 1) => {
      return {
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
          // Check state before updating
          const wasHovered = hoveredFields.has(fieldName)
          const isFocused = focusedFields.has(fieldName)
          const wasActive = wasHovered || isFocused

          setHoveredFields((prev) => new Set(prev).add(fieldName))

          // Only update if field hasn't been filled yet
          if (!filledFields.has(fieldName) && !wasActive) {
            // Field became active (hovered)
            incrementFormProgress(amount)
          }
        },
        onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
          // Check state before updating
          const wasHovered = hoveredFields.has(fieldName)
          const isFocused = focusedFields.has(fieldName)
          const wasActive = wasHovered || isFocused

          setHoveredFields((prev) => {
            const newSet = new Set(prev)
            newSet.delete(fieldName)
            return newSet
          })

          // Only update if field hasn't been filled yet
          if (!filledFields.has(fieldName) && wasActive && !isFocused) {
            // Field became inactive (lost both hover and focus)
            decrementFormProgress(amount)
          }
        },
        onFocus: (e: React.FocusEvent<HTMLElement>) => {
          // Check state before updating
          const wasFocused = focusedFields.has(fieldName)
          const isHovered = hoveredFields.has(fieldName)
          const wasActive = wasFocused || isHovered

          setFocusedFields((prev) => new Set(prev).add(fieldName))

          // Only update if field hasn't been filled yet
          if (!filledFields.has(fieldName) && !wasActive) {
            // Field became active (focused)
            incrementFormProgress(amount)
          }
        },
        onBlur: (e: React.FocusEvent<HTMLElement>) => {
          // Check state before updating
          const wasFocused = focusedFields.has(fieldName)
          const isHovered = hoveredFields.has(fieldName)
          const wasActive = wasFocused || isHovered

          setFocusedFields((prev) => {
            const newSet = new Set(prev)
            newSet.delete(fieldName)
            return newSet
          })

          // Only update if field hasn't been filled yet
          if (!filledFields.has(fieldName) && wasActive && !isHovered) {
            // Field became inactive (lost both hover and focus)
            decrementFormProgress(amount)
          }
        },
      }
    },
    [incrementFormProgress, decrementFormProgress, filledFields, hoveredFields, focusedFields],
  )

  const getFormChangeHandlers = useCallback(
    (fieldName: string, amount: number = 1) => {
      return {
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          // Get the current value when change happens
          const fieldValue = e.target.value
          const isFull = isFieldFull(fieldValue)
          const wasFilled = filledFields.has(fieldName)

          if (isFull === 1 && !wasFilled) {
            // Field is now filled and hasn't been counted yet
            setFilledFields((prev) => new Set(prev).add(fieldName))
            incrementFormProgress(amount)
          } else if (isFull === 0 && wasFilled) {
            // Field was filled but is now empty - remove it and decrement
            setFilledFields((prev) => {
              const newSet = new Set(prev)
              newSet.delete(fieldName)
              return newSet
            })
            decrementFormProgress(amount)
          }
        },
      }
    },
    [filledFields, incrementFormProgress, decrementFormProgress],
  )

  useEffect(() => {
    console.log('formPhase:', formPhase, 'formProgress:', formProgress)
  }, [formPhase, formProgress])

  return (
    <div className="relative overflow-hidden -mb-[10rem] -mt-[12rem] z-0">
      <div className="absolute z-[1] md:h-54 h-[15rem] w-full bg-gradient-to-b from-background-900 to-background-900/0 top-0" />

      <Section>
        <div className="container pt-24">
          {heading && !hasSubmitted && (
            <div className="flex w-full text-center">
              <RichText
                className="[&_*]:!type-h1 mb-8 lg:mb-12 text-foreground-900"
                data={heading}
                enableGutter={false}
              />
            </div>
          )}
          <FormProvider {...formMethods}>
            <AnimatePresence>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1.5, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  <RichText
                    className="-mb-64 mt-64 [&_*]:!text-foreground-500 text-center [&_h2]:mb-6 [&_p]:opacity-75 [&_*]:max-w-[48ch] "
                    data={confirmationMessage}
                    enableGutter={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading && !hasSubmitted && <Loading />}
            {error && <Error error={error} />}

            <form
              id={formID}
              onSubmit={handleSubmit(onSubmit)}
              className={hasSubmitted ? 'opacity-0 pointer-events-none invisible' : ''}
            >
              <Carousel
                className="mt-8 last:mb-0 mx-auto flex flex-row w-full [&>*]:w-full max-w-screen-sm"
                opts={{ watchDrag: false }}
                setApi={setCarouselApi}
              >
                <CarouselContent className="w-full ">
                  <CarouselItem className="w-full flex flex-col ">
                    <div className="relative p-2">
                      <FormLabel htmlFor={'email'} label={'Email'} required={true} />
                      <div className="grid grid-cols-[1fr,auto] gap-4 mt-2">
                        <Email
                          blockName={'email'}
                          blockType="email"
                          defaultValue=""
                          placeholder="Email"
                          label={''}
                          name="email"
                          required={true}
                          width={100}
                          register={register as unknown as UseFormRegister<FieldValues>}
                          {...getFormAttentionHandlers('email', 1)}
                          {...(getFormChangeHandlers('email', 1) as any)}
                        />
                        <Button
                          variant={'default'}
                          className="px-6 flex h-full"
                          type="button"
                          {...getFormAttentionHandlers('continue-button', 2)}
                          onClick={async (e) => {
                            e.preventDefault()
                            handleFormPhaseClick(e)
                            const isValid = await trigger('email' as any)
                            if (isValid && carouselApi) {
                              carouselApi.scrollNext()
                            }
                          }}
                        >
                          Continue
                        </Button>
                      </div>
                      {errors?.['email' as keyof typeof errors] && (
                        <FormError
                          name="email"
                          className="absolute top-full mt-0"
                          defaultMessage="Invalid Email Address"
                        />
                      )}
                    </div>
                  </CarouselItem>
                  <CarouselItem className="w-full flex flex-col justify-center ">
                    <div className="p-2 flex flex-col space-y-8">
                      {hasFields &&
                        fields?.map((field, index) => {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          const Field: React.FC<any> =
                            fieldComponents?.[field.blockType as keyof typeof fieldComponents]

                          if (!Field) return null

                          // Message fields are display-only and don't have a name property
                          const fieldName =
                            field.blockType === 'message' || !('name' in field) ? null : field.name

                          return (
                            <div className="" key={index}>
                              <Field
                                form={formFromProps}
                                {...field}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                                inputClassName="mt-1"
                                {...(fieldName ? getFormAttentionHandlers(fieldName, 1) : {})}
                                {...(fieldName ? getFormChangeHandlers(fieldName, 1) : {})}
                              />
                            </div>
                          )
                        })}
                      <div className="flex items-center gap-2 mb-4">
                        <Checkbox
                          id="write-message"
                          checked={showMessage}
                          onCheckedChange={(checked) => {
                            setShowMessage(checked === true)
                            if (checked === false) {
                              // Clear the message field when unchecked
                              ;(setValue as any)('message', '')
                            }
                          }}
                        />
                        <FormLabel
                          htmlFor="write-message"
                          label="Write a Message"
                          required={false}
                        />
                      </div>
                      {showMessage && (
                        <div className="mt-2">
                          <Textarea
                            blockName="message"
                            blockType="text"
                            defaultValue=""
                            label="Message"
                            name="message"
                            required={false}
                            width={100}
                            errors={errors as unknown as Partial<FieldErrorsImpl<FieldValues>>}
                            register={register as unknown as UseFormRegister<FieldValues>}
                            inputClassName="mt-1"
                            {...getFormAttentionHandlers('message', 1)}
                            {...(getFormChangeHandlers('message', 1) as any)}
                          />
                        </div>
                      )}
                      <Button
                        className="w-full mt-4"
                        form={formID}
                        type="submit"
                        variant="default"
                        {...getFormAttentionHandlers('submit-button', 2)}
                        onClick={handleFormPhaseClick}
                      >
                        {submitButtonLabel}
                      </Button>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </form>
          </FormProvider>

          <AnimatePresence>
            {formPhase === 0 && (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: Math.min(Math.max(0.5 + (formProgress / 4) * 0.5, 0.5), 1) }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 z-[-1]"
              >
                <motion.div
                  animate={{
                    rotate: 0,
                    top: '50%',
                    left: '50%',
                    y: '-44%',
                    x: '-53%',
                    width: '3000px',
                    height: '3000px',
                  }}
                  className="absolute left-0 z-[0]"
                >
                  <Media
                    resource={backgroundImage}
                    className="blur-xl object-left"
                    imgClassName="size-full object-left"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {formPhase === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                className="absolute inset-0 z-[-1]"
              >
                <motion.div
                  animate={{
                    rotate: Math.min(Math.max(-65 + ((formProgress - 3) / 9) * 65, -65), 0),
                    opacity: Math.min(Math.max(0.5 + ((formProgress - 3) / 9) * 0.5, 0.5), 1),
                  }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 z-[-1]"
                >
                  <motion.div
                    animate={{
                      rotate: 90,
                      top: '50%',
                      y: '-50%',
                      x: '-2000px',
                      width: '3800px',
                      height: '3800px',
                    }}
                    className="absolute left-0 z-[0]"
                  >
                    <Media
                      resource={backgroundImage}
                      className="blur-xl object-left"
                      imgClassName="size-full object-left"
                    />
                  </motion.div>
                  <motion.div
                    animate={{
                      rotate: -90,
                      right: 0,
                      top: '50%',
                      y: '-50%',
                      x: '2000px',
                      width: '3800px',
                      height: '3800px',
                    }}
                    className="absolute z-[0]"
                  >
                    <Media
                      resource={backgroundImage}
                      className="blur-xl object-right"
                      imgClassName="size-full object-left"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {formPhase === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                className="absolute inset-0 z-[-1]"
              >
                <motion.div
                  animate={{
                    rotate: 180,
                    top: '-20%',
                    left: '50%',
                    y: '-40%',
                    x: '-53%',
                    width: '3800px',
                    height: '3800px',
                  }}
                  className="absolute left-0 z-[0]"
                >
                  <Media
                    resource={backgroundImage}
                    className="blur-xl object-left"
                    imgClassName="size-full object-left"
                  />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: 0,
                    top: '50%',
                    left: '50%',
                    y: '-40%',
                    x: '-53%',
                    width: '3800px',
                    height: '3800px',
                  }}
                  className="absolute left-0 z-[0]"
                >
                  <Media
                    resource={backgroundImage}
                    className="blur-xl object-left"
                    imgClassName="size-full object-left"
                  />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: 90,
                    top: '50%',
                    y: '-70%',
                    x: '-2000px',
                    width: '3800px',
                    height: '3800px',
                  }}
                  className="absolute left-0 z-[0]"
                >
                  <Media
                    resource={backgroundImage}
                    className="blur-xl object-left"
                    imgClassName="size-full object-left"
                  />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: -90,
                    right: 0,
                    top: '50%',
                    y: '-70%',
                    x: '2000px',
                    width: '3800px',
                    height: '3800px',
                  }}
                  className="absolute z-[0]"
                >
                  <Media
                    resource={backgroundImage}
                    className="blur-xl object-right"
                    imgClassName="size-full object-left"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
    </div>
  )
}

function Loading() {
  return <p>Loading, please wait...</p>
}

function Error({ error }: { error: { message: string; status?: string } }) {
  return <div>{`${error.status || '500'}: ${error.message || ''}`}</div>
}
