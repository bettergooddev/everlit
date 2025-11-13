'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
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
import { getClientSideURL } from '@/utilities/getURL'
import { Email } from '../Form/Email'
import { Error as FormError } from '../Form/Error'
import { FormLabel } from '../Form/FormLabel'
import type { CallToActionBlock as CallToActionBlockPayloadType } from '@/payload-types'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'

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
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      console.log('Submitted form data:', data)
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        console.log('Form data to send:', dataToSend)

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const hasFields = formFromProps && formFromProps.fields
  const fields = formFromProps.fields

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
                    <FormLabel htmlFor={'Email'} label={'Email'} required={true} />
                    <div className="grid grid-cols-[1fr,auto] gap-4 mt-2">
                      <Email
                        blockName={'email'}
                        blockType="email"
                        defaultValue=""
                        placeholder="Email"
                        label={''}
                        name="Email"
                        required={true}
                        width={100}
                        // errors={errors as unknown as Partial<FieldErrorsImpl<FieldValues>>}
                        register={register as unknown as UseFormRegister<FieldValues>}
                      />
                      <Button
                        variant={'default'}
                        className="px-6 flex h-full"
                        type="button"
                        onClick={async (e) => {
                          e.preventDefault()
                          const isValid = await trigger('Email' as any)
                          if (isValid && carouselApi) {
                            carouselApi.scrollNext()
                          }
                        }}
                      >
                        Continue
                      </Button>
                    </div>
                    {errors?.['Email' as keyof typeof errors] && (
                      <FormError
                        name="Email"
                        className="absolute top-full mt-0"
                        defaultMessage="Invalid Email Address"
                      />
                    )}
                  </div>
                </CarouselItem>

                <CarouselItem className="w-full flex flex-col justify-center">
                  <div className="p-2">
                    {hasFields &&
                      fields?.map((field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fieldComponents?.[field.blockType as keyof typeof fieldComponents]

                        if (!Field) return null
                        return (
                          <div className="mb-6 last:mb-0" key={index}>
                            <Field
                              form={formFromProps}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                              inputClassName="mt-1"
                            />
                          </div>
                        )
                      })}
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
    </div>
  )
}

function Loading() {
  return <p>Loading, please wait...</p>
}

function Error({ error }: { error: { message: string; status?: string } }) {
  return <div>{`${error.status || '500'}: ${error.message || ''}`}</div>
}
