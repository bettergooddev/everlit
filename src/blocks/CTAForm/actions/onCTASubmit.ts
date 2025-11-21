import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { useRouter } from 'next/navigation'

import { getClientSideURL } from '@/utilities/getURL'

interface OnSubmitParams {
  formID: string | undefined
  confirmationType: string | undefined
  redirect: { url: string } | undefined
  setIsLoading: (loading: boolean) => void
  setHasSubmitted: (submitted: boolean) => void
  setError: (error: { message: string; status?: string } | undefined) => void
  router: ReturnType<typeof useRouter>
  incrementFormPhase: (amount?: number) => void
}

export function createOnCTASubmit({
  formID,
  confirmationType,
  redirect,
  setIsLoading,
  setHasSubmitted,
  setError,
  router,
  incrementFormPhase,
}: OnSubmitParams) {
  return (data: FormFieldBlock[]) => {
    console.log('Submitted form data:', data)
    console.log('Email data:', (data as any).email)
    let loadingTimerID: ReturnType<typeof setTimeout>
    const submitForm = async () => {
      setError(undefined)

      const dataToSend = Object.entries(data)
        .filter(([name, value]) => {
          // Exclude message field if it's empty or undefined
          if (name === 'message' && (!value || (value as unknown as string) === '')) {
            return false
          }
          return true
        })
        .map(([name, value]) => ({
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
        incrementFormPhase(1)

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
  }
}
