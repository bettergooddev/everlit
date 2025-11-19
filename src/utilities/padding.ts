import { tv } from 'tailwind-variants'

export type Padding = 'top-bottom' | 'top' | 'bottom' | 'none'

// Tailwind-Variants wrapper that maps Padding values to work with parent's md:my-section my-[6rem]
export const paddingStyle = tv({
  base: 'md:pt-section pt-[6rem] md:pb-section pb-[6rem] md:-my-section -my-[6rem]',
  variants: {
    padding: {
      'top-bottom': 'md:pt-section pt-[6rem] md:pb-section pb-[6rem] md:-my-section -my-[6rem]',
      top: 'md:pt-section pt-[6rem] md:-mt-section -mt-[6rem] !pb-0',
      bottom: 'md:pb-section pb-[6rem] md:-mb-section -mb-[6rem] !pt-0',
      none: 'md:-my-section -my-[6rem]',
    },
  },
})
