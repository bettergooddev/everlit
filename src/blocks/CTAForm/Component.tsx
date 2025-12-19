'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState, useRef } from 'react'
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
import Section from '@/components/Section'
import { Mail, Phone, MapPin } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlowPhase1 } from './glowPhase1'
import { GlowPhase2Desktop, GlowPhase2Mobile } from './glowPhase2'
import { GlowPhase3 } from './glowPhase3'

gsap.registerPlugin(useGSAP, ScrollTrigger)

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
    dedicatedPage,
    phone,
    email: emailLink,
    address,
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
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)

  // GSAP scroll-triggered animations for heading, form, and light in a single timeline
  useGSAP(
    () => {
      if (!headingRef.current || !formRef.current || !lightRef.current) return

      // Set initial states
      gsap.set(headingRef.current, {
        opacity: 0,
        scale: 0.9,
      })
      gsap.set(formRef.current, {
        opacity: 0,
        y: 30,
      })
      gsap.set(lightRef.current, {
        opacity: 0,
      })

      // Create timeline with all three animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 65%',
          once: true,
        },
      })

      // Add animations to timeline
      tl.to(headingRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power3.out',
      })
        .to(
          formRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: 'power3.out',
          },
          '-=1.7', // Start 1.7 seconds after heading starts (0.3s delay)
        )
        .to(
          lightRef.current,
          {
            opacity: 1,
            duration: 2.5,
            ease: 'power3.out',
          },
          '-=1.5', // Start 1.5 seconds after form starts (0.5s delay from heading)
        )

      return () => {
        tl.scrollTrigger?.kill()
      }
    },
    { scope: headingRef },
  )

  const hasFields = formFromProps && formFromProps.fields
  const fields = formFromProps.fields

  const incrementFormProgress = useCallback((amount: number = 1) => {
    setFormProgress((currentProgress) => currentProgress + amount)
  }, [])

  const decrementFormProgress = useCallback((amount: number = 1) => {
    setFormProgress((currentProgress) => Math.max(0, currentProgress - amount))
  }, [])

  const incrementFormPhase = useCallback((amount: number = 1) => {
    setFormPhase((currentPhase) => currentPhase + amount)
  }, [])

  const onSubmit = useCallback(
    createOnCTASubmit({
      formID,
      confirmationType,
      redirect,
      setIsLoading,
      setHasSubmitted,
      setError,
      router,
      incrementFormPhase,
    }),
    [router, formID, redirect, confirmationType, incrementFormPhase],
  )

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
    // console.log('formPhase:', formPhase, 'formProgress:', formProgress)
  }, [formPhase, formProgress])

  return (
    <div
      className={cn(
        'relative overflow-hidden z-0 -mb-section',
        dedicatedPage ? 'mt-section-small' : '-mt-[6rem]',
      )}
    >
      <div className="absolute z-[1] md:h-54 h-[15rem] w-full bg-gradient-to-b from-background-900 to-background-900/0 top-0" />

      <Section>
        <div className="container pt-24">
          {heading && !hasSubmitted && (
            <div ref={headingRef} className="flex w-full text-center">
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

            {error && <Error error={error} />}

            <form
              ref={formRef}
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
                      <div className="flex flex-col md:grid md:grid-cols-[1fr,auto] gap-4 mt-2">
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
                          className="px-6 flex md:h-full w-full md:w-auto"
                          type="button"
                          {...getFormAttentionHandlers('continue-button', 2)}
                          onClick={async (e) => {
                            e.preventDefault()
                            const emailValue = watch('email' as any)
                            const isValid = await trigger('email' as any)
                            if (isValid && emailValue && carouselApi) {
                              handleFormPhaseClick(e)
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
                        disabled={isLoading}
                        {...getFormAttentionHandlers('submit-button', 2)}
                      >
                        {isLoading ? 'Please wait...' : submitButtonLabel}
                      </Button>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </form>
          </FormProvider>

          <AnimatePresence>
            {formPhase === 0 && (
              <GlowPhase1
                backgroundImage={backgroundImage}
                formProgress={formProgress}
                lightRef={lightRef}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {formPhase === 1 && (
              <>
                <GlowPhase2Desktop
                  backgroundImage={backgroundImage}
                  formProgress={formProgress}
                  className="hidden md:block"
                />
                <GlowPhase2Mobile
                  backgroundImage={backgroundImage}
                  formProgress={formProgress}
                  className="md:hidden"
                />
              </>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {formPhase === 2 && <GlowPhase3 backgroundImage={backgroundImage} />}
          </AnimatePresence>
        </div>

        {dedicatedPage && (emailLink || phone || address) && (
          <div className="mt-48 pb-12 flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-32 justify-center">
            {emailLink && (
              <div className="flex flex-col items-center md:items-start">
                <Mail className="w-6 h-6 mb-3" />
                <h4 className="type-h4 font-medium mb-2">Email</h4>
                <CMSLink
                  {...emailLink}
                  appearance="inline"
                  className="type-body text-foreground-700 hover:opacity-100 underline transition-colors text-center md:text-left p-0 -mt-1.5 opacity-75"
                />
              </div>
            )}
            {phone && (
              <div className="flex flex-col items-center md:items-start">
                <Phone className="w-6 h-6 mb-3" />
                <h4 className="type-h4 font-medium mb-2">Phone</h4>
                <CMSLink
                  {...phone}
                  appearance="inline"
                  className="type-body text-foreground-700 hover:opacity-100 underline transition-colors text-center md:text-left p-0 -mt-1.5 opacity-75"
                />
              </div>
            )}
            {address && (
              <div className="flex flex-col items-center md:items-start">
                <MapPin className="w-6 h-6 mb-3" />
                <h4 className="type-h4 font-medium mb-2">Office</h4>
                <CMSLink
                  {...address}
                  appearance="inline"
                  className="type-body text-foreground-700 hover:opacity-100 underline transition-colors text-center md:text-left p-0 -mt-1.5 opacity-75"
                />
              </div>
            )}
          </div>
        )}
      </Section>
    </div>
  )
}

function Error({ error }: { error: { message: string; status?: string } }) {
  return <div>{`${error.status || '500'}: ${error.message || ''}`}</div>
}
