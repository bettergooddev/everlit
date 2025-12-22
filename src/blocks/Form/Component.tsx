'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { formVerificationAction } from '@/actions/form-verification'
import { getCaptchaToken } from '@/utilities/captcha'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import Section from '@/components/Section'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 500ms
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 500)

        const token = await getCaptchaToken()
        const captchaResponse = await formVerificationAction(token)

        if (captchaResponse.success) {
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
            clearTimeout(loadingTimerID)
            setIsLoading(false)
            setError({
              message: 'Something went wrong.',
            })
          }
        } else {
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({
            message: 'Captcha Failed',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <Section className="z-[1]">
      <div className="container lg:max-w-[48rem] -mt-[6rem] md:-mt-section theme-sugar-shack">
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
        )}
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText
              className="[&_*]:!text-foreground-100 text-center [&_h2]:mb-6 [&_p]:opacity-75"
              data={confirmationMessage}
            />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button className="theme-pizza mt-4" form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </Section>
  )
}
