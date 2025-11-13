'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
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

  const getFormAttentionHandlers = useCallback(
    (fieldName: string, amount: number = 1) => {
      return {
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
          console.log('Mouse enter triggered by:', e.currentTarget)
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
          console.log('Mouse leave triggered by:', e.currentTarget)
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
          console.log('Focus triggered by:', e.currentTarget)
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
          console.log('Blur triggered by:', e.currentTarget)
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
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          console.log('Change triggered by:', e.currentTarget)
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

  // useEffect(() => {
  //   console.log('Form progress value:', formProgress)
  // }, [formProgress])

  useEffect(() => {
    console.log('Filled fields:', Array.from(filledFields))
  }, [filledFields])

  return (
    <div className="container">
      {heading && !hasSubmitted && (
        <div className="flex w-full text-center">
          <RichText className="[&_*]:!type-h1 mb-8 lg:mb-12" data={heading} enableGutter={false} />
        </div>
      )}

      <FormProvider {...formMethods}>
        {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <RichText
            className="[&_*]:!text-foreground-100 text-center [&_h2]:mb-6 [&_p]:opacity-75"
            data={confirmationMessage}
          />
        )}

        {isLoading && !hasSubmitted && <Loading />}
        {error && <Error error={error} />}

        {!hasSubmitted && (
          <form id={formID} onSubmit={handleSubmit(onSubmit)}>
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
                        // errors={errors as unknown as Partial<FieldErrorsImpl<FieldValues>>}
                        register={register as unknown as UseFormRegister<FieldValues>}
                        {...getFormAttentionHandlers('email', 1)}
                        {...getFormChangeHandlers('email', 1)}
                      />
                      <Button
                        variant={'default'}
                        className="px-6 flex h-full"
                        type="button"
                        {...getFormAttentionHandlers('continue-button', 2)}
                        onClick={async (e) => {
                          e.preventDefault()
                          const emailValue = watch('email' as any)
                          console.log('Email data:', emailValue)
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
                              // {...getFormAttentionHandlers(1)}
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
                        }}
                      />
                      <FormLabel htmlFor="write-message" label="Write a Message" required={false} />
                    </div>
                    {showMessage && (
                      <div className="mt-2">
                        <Textarea
                          blockName="message"
                          blockType="text"
                          defaultValue=""
                          label="Message"
                          name="Message"
                          required={false}
                          width={100}
                          errors={errors as unknown as Partial<FieldErrorsImpl<FieldValues>>}
                          register={register as unknown as UseFormRegister<FieldValues>}
                          inputClassName="mt-1"
                        />
                      </div>
                    )}
                    <Button className="w-full mt-4" form={formID} type="submit" variant="default">
                      {submitButtonLabel}
                    </Button>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </form>
        )}
      </FormProvider>

      {!hasSubmitted && (
        <div className="flex justify-center mt-8">
          <div
            className="w-16 h-16 bg-red-500 rounded-full transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${1 + formProgress * 0.1})`,
            }}
          />
        </div>
      )}
    </div>
  )
}

function Loading() {
  return <p>Loading, please wait...</p>
}

function Error({ error }: { error: { message: string; status?: string } }) {
  return <div>{`${error.status || '500'}: ${error.message || ''}`}</div>
}
