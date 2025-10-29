import { tv } from 'tailwind-variants'

export type Padding = 'top-bottom' | 'top' | 'bottom' | 'none'

// Tailwind-Variants wrapper that maps Padding values to work with parent's md:my-48 my-[6rem]
export const paddingStyle = tv({
  base: 'md:pt-48 pt-[6rem] md:pb-48 pb-[6rem] md:-my-48 -my-[6rem]',
  variants: {
    padding: {
      'top-bottom': 'md:pt-48 pt-[6rem] md:pb-48 pb-[6rem] md:-my-48 -my-[6rem]',
      top: 'md:pt-48 pt-[6rem] md:-mt-48 -mt-[6rem] !pb-0',
      bottom: 'md:pb-48 pb-[6rem] md:-mb-48 -mb-[6rem] !pt-0',
      none: 'md:-my-48 -my-[6rem]',
    },
  },
})
