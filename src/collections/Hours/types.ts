import { Hour, Brand } from '@/payload-types'

// The original type suggests that brand can be a string, but so long as the depth of the api call is correct, that will never happen, so we can correct that here.

export type HoursType = NonNullable<
  Array<
    Omit<NonNullable<Hour['hours']>[number], 'brand'> & {
      brand: Brand
    }
  >
>
